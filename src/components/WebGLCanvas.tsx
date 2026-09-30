import { useEffect, useRef } from 'react';

const VERT_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG_SRC = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;

vec3 palette(float t) {
  vec3 a = vec3(0.043, 0.071, 0.125);  // navy
  vec3 b = vec3(0.310, 0.275, 0.898);  // indigo
  vec3 c = vec3(0.082, 0.718, 0.651);  // teal
  vec3 d = vec3(0.188, 0.106, 0.400);  // deep purple
  return a + b * cos(6.283185 * (c * t + d));
}

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.y = 1.0 - uv.y;

  float t = u_time * 0.12;

  vec2 q = vec2(
    fbm(uv + vec2(0.0, 0.0)),
    fbm(uv + vec2(5.2, 1.3))
  );

  vec2 r = vec2(
    fbm(uv + 4.0 * q + vec2(1.7 + t * 0.5, 9.2)),
    fbm(uv + 4.0 * q + vec2(8.3 + t * 0.3, 2.8))
  );

  float f = fbm(uv + 4.0 * r);

  vec3 col = palette(f + 0.5 * t);

  float vignette = 1.0 - smoothstep(0.4, 1.0, length(uv - 0.5) * 1.3);
  col = mix(vec3(0.04, 0.07, 0.13), col, vignette * 0.85 + 0.15);
  col = mix(col, vec3(0.04, 0.07, 0.13), 0.35);

  // subtle scan lines
  float scan = sin(uv.y * u_resolution.y * 2.0) * 0.015;
  col += scan;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function createProgram(
  gl: WebGLRenderingContext,
  vert: WebGLShader,
  frag: WebGLShader
): WebGLProgram | null {
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, vert);
  gl.attachShader(p, frag);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

export function WebGLCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const vert = createShader(gl, gl.VERTEX_SHADER, VERT_SRC);
    const frag = createShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vert || !frag) return;

    const program = createProgram(gl, vert, frag);
    if (!program) return;

    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');

    let animId: number;
    let startTime = performance.now();

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    function render() {
      const t = (performance.now() - startTime) / 1000;
      gl!.uniform1f(timeLoc, t);
      gl!.uniform2f(resLoc, canvas!.width, canvas!.height);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={['w-full h-full', className].join(' ')}
      aria-hidden="true"
    />
  );
}
