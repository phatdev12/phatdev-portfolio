varying vec2 vUv;
varying vec3 vColor;

float pseudoRandom(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}


void main(){
  gl_FragColor = vec4(vUv, 0.0 , 1.0);
  gl_FragColor = vec4(vColor, 1.);

}