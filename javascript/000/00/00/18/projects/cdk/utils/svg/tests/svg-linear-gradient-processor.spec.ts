import {tuiSvgLinearGradientProcessor} from '@taiga-ui/cdk';

describe(`svgLinearGradientProcessor`, () => {
    it(`correct replacing ids`, () => {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64px" height="64px"><linearGradient
        id="r4wzZI4nTYpRSYqL7WQ95a"
        x1="37"
        x2="37"
        y1="14.5"
        y2="19.332"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
    ><stop offset="0" stop-color="currentColor" /><stop offset="1" stop-color="currentColor" /></linearGradient><path
        fill="url(#r4wzZI4nTYpRSYqL7WQ95a)"
        d="M37 14.854A2 2 0 1 0 37 18.854A2 2 0 1 0 37 14.854Z"
    /><linearGradient
        id="r4wzZI4nTYpRSYqL7WQ95b"
        x1="27"
        x2="27"
        y1="14.5"
        y2="19.332"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
    ><stop offset="0" stop-color="currentColor" /><stop offset="1" stop-color="currentColor" /></linearGradient><path
        fill="url(#r4wzZI4nTYpRSYqL7WQ95b)"
        d="M27 14.854A2 2 0 1 0 27 18.854A2 2 0 1 0 27 14.854Z"
    /><linearGradient
        id="r4wzZI4nTYpRSYqL7WQ95c"
        x1="32"
        x2="32"
        y1="5.25"
        y2="59.232"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
    ><stop offset="0" stop-color="currentColor" /><stop offset="1" stop-color="currentColor" /></linearGradient><path
        fill="url(#r4wzZI4nTYpRSYqL7WQ95c)"
        d="M49,22h-2h-0.049c-0.284-4.495-2.458-8.387-5.765-10.919l3.521-3.521l-1.414-1.414 l-3.807,3.807C37.293,8.713,34.747,8,32,8s-5.294,0.713-7.486,1.953l-3.807-3.807l-1.414,1.414l3.521,3.521 c-3.307,2.532-5.48,6.424-5.765,10.919H17h-2c-2.243,0-4,1.692-4,3.854v13c0,2.206,1.794,4,4,4c0.732,0,1-0.212,2-0.556v1.556 c0,2.438,2,4.545,4,5.038v4.962c0,2.206,1.794,4,4,4s4-1.794,4-4V49h6v4.854c0,2.206,1.794,4,4,4s4-1.794,4-4v-4.962 c2-0.492,4-2.599,4-5.038v-1.556c1,0.344,1.268,0.556,2,0.556c2.206,0,4-1.794,4-4v-13C53,23.692,51.243,22,49,22z M32,10 c6.953,0,12.469,5.194,12.964,12H19.036C19.531,15.194,25.047,10,32,10z M15,40.854c-1.103,0-2-0.897-2-2v-13 C13,24.797,13.859,24,15,24h2v14.854C17,39.956,16.103,40.854,15,40.854z M27,53.854c0,1.103-0.897,2-2,2s-2-0.897-2-2V49h4V53.854z M39,55.854c-1.103,0-2-0.897-2-2V49h4v4.854C41,54.956,40.103,55.854,39,55.854z M45,43.854C45,45.56,43.626,47,42,47H22 c-1.626,0-3-1.44-3-3.146v-5V24h26v14.854V43.854z M51,38.854c0,1.103-0.897,2-2,2s-2-0.897-2-2V24h2c1.141,0,2,0.797,2,1.854 V38.854z"
    /></svg>
`;

        expect(tuiSvgLinearGradientProcessor(svg, `MOCK_ID`))
            .toEqual(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64px" height="64px"><linearGradient
        id="r4wzZI4nTYpRSYqL7WQ95a_MOCK_ID"
        x1="37"
        x2="37"
        y1="14.5"
        y2="19.332"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
    ><stop offset="0" stop-color="currentColor" /><stop offset="1" stop-color="currentColor" /></linearGradient><path
        fill="url(#r4wzZI4nTYpRSYqL7WQ95a_MOCK_ID)"
        d="M37 14.854A2 2 0 1 0 37 18.854A2 2 0 1 0 37 14.854Z"
    /><linearGradient
        id="r4wzZI4nTYpRSYqL7WQ95b_MOCK_ID"
        x1="27"
        x2="27"
        y1="14.5"
        y2="19.332"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
    ><stop offset="0" stop-color="currentColor" /><stop offset="1" stop-color="currentColor" /></linearGradient><path
        fill="url(#r4wzZI4nTYpRSYqL7WQ95b_MOCK_ID)"
        d="M27 14.854A2 2 0 1 0 27 18.854A2 2 0 1 0 27 14.854Z"
    /><linearGradient
        id="r4wzZI4nTYpRSYqL7WQ95c_MOCK_ID"
        x1="32"
        x2="32"
        y1="5.25"
        y2="59.232"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
    ><stop offset="0" stop-color="currentColor" /><stop offset="1" stop-color="currentColor" /></linearGradient><path
        fill="url(#r4wzZI4nTYpRSYqL7WQ95c_MOCK_ID)"
        d="M49,22h-2h-0.049c-0.284-4.495-2.458-8.387-5.765-10.919l3.521-3.521l-1.414-1.414 l-3.807,3.807C37.293,8.713,34.747,8,32,8s-5.294,0.713-7.486,1.953l-3.807-3.807l-1.414,1.414l3.521,3.521 c-3.307,2.532-5.48,6.424-5.765,10.919H17h-2c-2.243,0-4,1.692-4,3.854v13c0,2.206,1.794,4,4,4c0.732,0,1-0.212,2-0.556v1.556 c0,2.438,2,4.545,4,5.038v4.962c0,2.206,1.794,4,4,4s4-1.794,4-4V49h6v4.854c0,2.206,1.794,4,4,4s4-1.794,4-4v-4.962 c2-0.492,4-2.599,4-5.038v-1.556c1,0.344,1.268,0.556,2,0.556c2.206,0,4-1.794,4-4v-13C53,23.692,51.243,22,49,22z M32,10 c6.953,0,12.469,5.194,12.964,12H19.036C19.531,15.194,25.047,10,32,10z M15,40.854c-1.103,0-2-0.897-2-2v-13 C13,24.797,13.859,24,15,24h2v14.854C17,39.956,16.103,40.854,15,40.854z M27,53.854c0,1.103-0.897,2-2,2s-2-0.897-2-2V49h4V53.854z M39,55.854c-1.103,0-2-0.897-2-2V49h4v4.854C41,54.956,40.103,55.854,39,55.854z M45,43.854C45,45.56,43.626,47,42,47H22 c-1.626,0-3-1.44-3-3.146v-5V24h26v14.854V43.854z M51,38.854c0,1.103-0.897,2-2,2s-2-0.897-2-2V24h2c1.141,0,2,0.797,2,1.854 V38.854z"
    /></svg>
`);
    });

    it(`ignore hex color`, () => {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 512 512">
 <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->

 <g>
  <title>background</title>
  <rect fill="none" id="canvas_background" height="514" width="514" y="-1" x="-1"/>
  <g display="none" id="canvasGrid">
   <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%" id="svg_1"/>
  </g>
 </g>
 <g>
  <title>Layer 1</title>
  <style type="text/css">.st0{fill:#2190e4;}
\t.st1{fill:#1d85d4;}
\t.st2{fill:#FFFFFF;}</style>
  <g stroke="null" id="svg_8">
   <g stroke="null" transform="matrix(2.5122204305161695,0,0,2.5122204305161695,-1123.5039578168125,-1123.4669114951682) " id="svg_5">
    <polygon stroke="null" id="svg_6" points="549.31640625,448.91835513710976 549.31640625,448.91835513710976 549.31640625,448.91835513710976 456.2164001464844,482.118367344141 470.4164123535156,605.2183429300785 549.31640625,648.9183551371098 549.31640625,648.9183551371098 549.31640625,648.9183551371098 628.2164306640625,605.2183429300785 642.4164428710938,482.118367344141 " class="st0"/>
    <polygon stroke="null" id="svg_7" points="549.31640625,448.91835513710976 549.31640625,471.118367344141 549.31640625,471.0183612406254 549.31640625,572.3183795511723 549.31640625,572.3183795511723 549.31640625,648.9183551371098 549.31640625,648.9183551371098 628.2164306640625,605.2183429300785 642.4164428710938,482.118367344141 549.31640625,448.91835513710976 " class="st1"/>
   </g>
  </g>
  <g stroke="null" id="svg_18">
   <path fill="#ffffff" stroke="null" id="svg_16" d="m257.249495,192.912241c-21.146608,0 -38.35198,17.205371 -38.35198,38.35198c0,21.148462 17.205372,38.353834 38.35198,38.353834c21.148462,0 38.353834,-17.205371 38.353834,-38.353834c0,-21.146609 -17.205372,-38.35198 -38.353834,-38.35198zm0,0"/>
   <path fill="#ffffff" stroke="null" id="svg_17" d="m257.249495,145.793512c-49.104179,0 -89.052304,39.948125 -89.052304,89.052304c0,22.557371 14.213294,54.428371 42.246871,94.728723c20.490353,29.45917 40.643311,52.255685 41.492364,53.21226l5.313069,5.99157l5.314923,-5.99157c0.847199,-0.956575 21.000156,-23.75309 41.492364,-53.21226c28.031723,-40.300353 42.246871,-72.171352 42.246871,-94.728723c0,-49.104179 -39.949979,-89.052304 -89.054158,-89.052304zm0,138.030422c-28.980883,0 -52.557858,-23.57883 -52.557858,-52.559713s23.576976,-52.557859 52.557858,-52.557859c28.982737,0 52.559713,23.576976 52.559713,52.557859s-23.576976,52.559713 -52.559713,52.559713zm0,0"/>
  </g>
 </g>
</svg>`;

        expect(tuiSvgLinearGradientProcessor(svg, `MOCK_ID`))
            .toEqual(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 512 512">
 <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->

 <g>
  <title>background</title>
  <rect fill="none" id="canvas_background" height="514" width="514" y="-1" x="-1"/>
  <g display="none" id="canvasGrid">
   <rect fill="url(#gridpattern_MOCK_ID)" stroke-width="0" y="0" x="0" height="100%" width="100%" id="svg_1"/>
  </g>
 </g>
 <g>
  <title>Layer 1</title>
  <style type="text/css">.st0{fill:#2190e4;}
\t.st1{fill:#1d85d4;}
\t.st2{fill:#FFFFFF;}</style>
  <g stroke="null" id="svg_8">
   <g stroke="null" transform="matrix(2.5122204305161695,0,0,2.5122204305161695,-1123.5039578168125,-1123.4669114951682) " id="svg_5">
    <polygon stroke="null" id="svg_6" points="549.31640625,448.91835513710976 549.31640625,448.91835513710976 549.31640625,448.91835513710976 456.2164001464844,482.118367344141 470.4164123535156,605.2183429300785 549.31640625,648.9183551371098 549.31640625,648.9183551371098 549.31640625,648.9183551371098 628.2164306640625,605.2183429300785 642.4164428710938,482.118367344141 " class="st0"/>
    <polygon stroke="null" id="svg_7" points="549.31640625,448.91835513710976 549.31640625,471.118367344141 549.31640625,471.0183612406254 549.31640625,572.3183795511723 549.31640625,572.3183795511723 549.31640625,648.9183551371098 549.31640625,648.9183551371098 628.2164306640625,605.2183429300785 642.4164428710938,482.118367344141 549.31640625,448.91835513710976 " class="st1"/>
   </g>
  </g>
  <g stroke="null" id="svg_18">
   <path fill="#ffffff" stroke="null" id="svg_16" d="m257.249495,192.912241c-21.146608,0 -38.35198,17.205371 -38.35198,38.35198c0,21.148462 17.205372,38.353834 38.35198,38.353834c21.148462,0 38.353834,-17.205371 38.353834,-38.353834c0,-21.146609 -17.205372,-38.35198 -38.353834,-38.35198zm0,0"/>
   <path fill="#ffffff" stroke="null" id="svg_17" d="m257.249495,145.793512c-49.104179,0 -89.052304,39.948125 -89.052304,89.052304c0,22.557371 14.213294,54.428371 42.246871,94.728723c20.490353,29.45917 40.643311,52.255685 41.492364,53.21226l5.313069,5.99157l5.314923,-5.99157c0.847199,-0.956575 21.000156,-23.75309 41.492364,-53.21226c28.031723,-40.300353 42.246871,-72.171352 42.246871,-94.728723c0,-49.104179 -39.949979,-89.052304 -89.054158,-89.052304zm0,138.030422c-28.980883,0 -52.557858,-23.57883 -52.557858,-52.559713s23.576976,-52.557859 52.557858,-52.557859c28.982737,0 52.559713,23.576976 52.559713,52.557859s-23.576976,52.559713 -52.559713,52.559713zm0,0"/>
  </g>
 </g>
</svg>`);
    });
});
