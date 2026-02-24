Core Logic (@a11ymorph/core)
```

// 1. Theme Engine Pseudo-code

function getNeumorphicTokens(baseColor) {

    const hsl = convertToHSL(baseColor);

    

    // Lightness shifts (Phase 1)

    const light = { ...hsl, l: hsl.l + 15, s: hsl.s - 5 };

    const dark = { ...hsl, l: hsl.l - 15, s: hsl.s + 10 };

    

    // Accessibility Guardrail (Phase 3)

    const contrast = calculateContrast(light, baseColor);

    const border = contrast < 3.0 ? `1px solid rgba(0,0,0,0.1)` : "none";

    

    return {

        background: baseColor,

        lightShadow: toHex(light),

        darkShadow: toHex(dark),

        outline: border

    };

}

```

React Component (@a11ymorph/react)
```

// 2. The Surface Primitive (Phase 2 & 4)

const Surface = ({ elevation, bgColor, children }) => {

    const tokens = useMemo(() => getNeumorphicTokens(bgColor), [bgColor]);

    

    const shadowStyle = elevation === 'extruded' 

        ? `6px 6px 12px ${tokens.darkShadow}, -6px -6px 12px ${tokens.lightShadow}`

        : `inset 4px 4px 8px ${tokens.darkShadow}, inset -4px -4px 8px ${tokens.lightShadow}`;

    return (

        <motion.div 

            style={{ 

                background: tokens.background, 

                boxShadow: shadowStyle,

                border: tokens.outline 

            }}

            whileTap={{ boxShadow: insetShadow }} // Tactile feedback

        >

            {children}

        </motion.div>

    );

};

```

React Native (@a11ymorph/native)
```

// 3. Mobile Shadow Logic

const NativeSurface = ({ elevation, bgColor }) => {

    const tokens = getNeumorphicTokens(bgColor);

    

    // Using SVG Shadow component for Android/iOS consistency

    return (

        <Shadow distance={6} startColor={tokens.darkShadow} offset={[6, 6]}>

            <Shadow distance={6} startColor={tokens.lightShadow} offset={[-6, -6]}>

                <View style={{ backgroundColor: tokens.background }}>

                    {/* Content */}

                </View>

            </Shadow>

        </Shadow>

    );

};

```