uniform vec3 uColor;
uniform sampler2D uTexture; // type for texture

varying vec2 vUv;
varying float vElevation;

void main() {

  vec4 textureColor = texture2D(uTexture, vUv);
  textureColor.rgb *= vElevation * 2.0 + 0.8;

  // gl_FragColor = vec4(uColor, 1.0);
  gl_FragColor = textureColor;

  // 디버깅하려면 어려워서.. 일일이 찍어보는수밖에없음 ㅠ
  gl_FragColor = vec4(vUv, 1.0, 1.0);
}