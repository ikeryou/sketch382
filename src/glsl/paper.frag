precision highp float;

uniform sampler2D tDiffuse;
uniform float alpha;
uniform vec2 range;
uniform vec3 col;

varying vec2 vUv;

void main(void) {
  if(vUv.x < range.x || vUv.x > range.y) {
    discard;
  }

  // vec4 texl = texture2D(tDiffuse, vUv);
  vec4 texl = vec4(1.0, 0.0, 0.0, 1.0);
  if(texl.a <= 0.1) {
    discard;
  }

  vec3 color;

  // 裏側は見せない
  if(gl_FrontFacing == false) {
    color = col * 0.9;
  } else {
    color = col;
  }

  vec3 last = color;
  // last = mix(vec3(1.0), last, alpha);

  gl_FragColor = vec4(last, texl.a);
}
