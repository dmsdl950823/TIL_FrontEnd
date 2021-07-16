// Open GL Shading Language = glsl
uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main() {

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;

  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
  vElevation = elevation;
}


/*
  1. there is no console...!!! ;ㅁ;
  2. doesn't matter with text indent
  3. semicolon is important!
  4. variable => typed language
    ex)
      type variableName = value;

      float a = 1.0;
      int b = 2;
      float c = a + float(b);

      bool foo = true;

      vec2 variableName = vec2(float x, float y);
      vec2 foo = vec2(-1.0, 2.0);
      foo.x = 1.0;
      foo.y = 1.0;
      foo *= 2.0;  // === vec2(-2.0, 4.0);

      vec3 foo = vec3(0.0);
      vec3 bar = vec3(1.0, 2.0, 3.0);
      bar.z = 4.0;

      vec3 purpleColor = vec3(0.0);
      purpleColor.r = 0.5;
      purpleColor.b = 1.0;

      vec2 foo = vec2(1.0, 2.0);
      vec3 bar = vec3(foo, 3.0);

      vec3 foo = vec3(1.0, 2.0, 3.0);
      vec2 bar = foo.xy;


      vec4 foo = vec4(1.0, 2.0, 3.0, 4.0);
      float bar = foo.w; // rgb`a`
  
  5. function => typed return function
    type functionName () { /* return ... *\ }
    void loremIpsum (float a, float b) { /* ... *\ }
    float result = loremIpsum(1.0, 2.0)

  6. cross, dot, mix, step, smoothstep, length, distance, reflection, refraction ...

  7. void main () {} function 은 자동으로 실행되는 함수. return 없음!

  documentation 이 없음! -> 자료 찾아야함
  https://thebookofshaders.com/?lan=kr

  8. Matics Uniforms
  Each matrix will transform the position until we get the final clup space coordinate
    1) uniforms because they are the same for all vetices 
    2) To apply a matrix, we multiply it
    3) The matirx must have the same size as the coordinate (mat4 for vec4)
    4) modelMatrix apply transformation relative to the Mesh (position, rotation, scale)
    
*/