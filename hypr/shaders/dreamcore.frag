#version 300 es
precision highp float;

in vec2 v_texcoord;
uniform sampler2D tex;

out vec4 fragColor;

float random(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec4 pixColor = texture(tex, v_texcoord);

    // Vibrancy
    float vibrancy = 1.12;
    vec3 gray = vec3(dot(pixColor.rgb, vec3(0.299, 0.587, 0.114)));
    pixColor.rgb = mix(gray, pixColor.rgb, vibrancy);

    // Grano / ruido estático
    float grainStrength = 0.06;
    float noise = random(v_texcoord);
    pixColor.rgb += (noise - 0.5) * grainStrength;

    fragColor = pixColor;
}
