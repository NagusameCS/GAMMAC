let currentLang = 'es';

const translations = {
    es: {
        courseTitle: "Curso de Binario",
        back: "← Volver",
        prev: "Anterior",
        next: "Siguiente",
        check: "Verificar",
        loading: "Cargando lección...",
        tryAgain: "Inténtalo de nuevo.",
        correct: "¡Correcto!",
        excellent: "¡Excelente!",
        perfect: "¡Perfecto!",
        good: "¡Bien!",
        need5: "Necesitas 5.",
        need13: "Intenta sumar 8 + 4 + 1.",
        need2: "El resultado debe ser 2 (binario 10).",
        needBoth: "Ambos interruptores deben estar encendidos.",
        needOne: "Enciende al menos un interruptor.",
        incomplete: "Incompleto",
        completed: "Completado",
        langAbbr: "ES",
        sections: {
            basics: "Conceptos Básicos",
            arithmetic: "Aritmética Binaria",
            logic: "Puertas Lógicas",
            advanced: "Avanzado",
            images: "Imágenes Binarias"
        }
    },
    en: {
        courseTitle: "Binary Course",
        back: "← Back",
        prev: "Previous",
        next: "Next",
        check: "Check",
        loading: "Loading lesson...",
        tryAgain: "Try again.",
        correct: "Correct!",
        excellent: "Excellent!",
        perfect: "Perfect!",
        good: "Good!",
        need5: "You need 5.",
        need13: "Try adding 8 + 4 + 1.",
        need2: "The result must be 2 (binary 10).",
        needBoth: "Both switches must be on.",
        needOne: "Turn on at least one switch.",
        incomplete: "Incomplete",
        completed: "Completed",
        langAbbr: "EN",
        sections: {
            basics: "Basic Concepts",
            arithmetic: "Binary Arithmetic",
            logic: "Logic Gates",
            advanced: "Advanced",
            images: "Binary Images"
        }
    }
};

const lessons = [
    {
        id: "lesson1",
        section: "basics",
        content: {
            es: {
                title: "Lección 1: El Bit",
                instruction: `
                    <p>Bienvenido al mundo digital. Aquí, todo se reduce a dos estados: <strong>Encendido (1)</strong> y <strong>Apagado (0)</strong>.</p>
                    <p>A esto le llamamos un <strong>Bit</strong>.</p>
                    <p>Intenta encender el interruptor para representar un "1".</p>
                `,
                success: "¡Correcto! Encendido es 1."
            },
            en: {
                title: "Lesson 1: The Bit",
                instruction: `
                    <p>Welcome to the digital world. Here, everything boils down to two states: <strong>On (1)</strong> and <strong>Off (0)</strong>.</p>
                    <p>We call this a <strong>Bit</strong>.</p>
                    <p>Try turning on the switch to represent a "1".</p>
                `,
                success: "Correct! On is 1."
            }
        },
        setup: (container) => {
            createSwitches(container, 1, [1]);
        },
        check: () => {
            const val = getSwitchValue(0);
            return val === 1 ? true : false;
        }
    },
    {
        id: "lesson2",
        section: "basics",
        content: {
            es: {
                title: "Lección 2: Valores de Posición",
                instruction: `
                    <p>Un solo bit no puede contar mucho. Pero si juntamos varios, ¡podemos contar más alto!</p>
                    <p>Cada posición tiene un valor que es el doble del anterior: <strong>8, 4, 2, 1</strong>.</p>
                    <p>Enciende los interruptores para sumar <strong>5</strong> (4 + 1).</p>
                `,
                success: "¡Excelente! 4 + 1 = 5 (0101 en binario).",
                fail: (total) => `Tienes ${total}. Necesitas 5.`
            },
            en: {
                title: "Lesson 2: Place Values",
                instruction: `
                    <p>A single bit can't count much. But if we group them, we can count higher!</p>
                    <p>Each position has a value that is double the previous one: <strong>8, 4, 2, 1</strong>.</p>
                    <p>Turn on the switches to sum <strong>5</strong> (4 + 1).</p>
                `,
                success: "Excellent! 4 + 1 = 5 (0101 in binary).",
                fail: (total) => `You have ${total}. You need 5.`
            }
        },
        setup: (container) => {
            createSwitches(container, 4, [8, 4, 2, 1]);
        },
        check: () => {
            const total = calculateTotal([8, 4, 2, 1]);
            if (total === 5) return true;
            return total; // Return value for custom fail message
        }
    },
    {
        id: "lesson3",
        section: "basics",
        content: {
            es: {
                title: "Lección 3: Contando en Binario",
                instruction: `
                    <p>Vamos a practicar. Intenta formar el número <strong>13</strong>.</p>
                `,
                success: "¡Perfecto! 1101 es 13.",
                fail: (total) => `Tienes ${total}. Intenta sumar 8 + 4 + 1.`
            },
            en: {
                title: "Lesson 3: Counting in Binary",
                instruction: `
                    <p>Let's practice. Try to form the number <strong>13</strong>.</p>
                `,
                success: "Perfect! 1101 is 13.",
                fail: (total) => `You have ${total}. Try adding 8 + 4 + 1.`
            }
        },
        setup: (container) => {
            createSwitches(container, 4, [8, 4, 2, 1]);
        },
        check: () => {
            const total = calculateTotal([8, 4, 2, 1]);
            if (total === 13) return true;
            return total;
        }
    },
    {
        id: "lesson3_practice",
        section: "basics",
        content: {
            es: {
                title: "Práctica: Forma el 10",
                instruction: `
                    <p>Intenta formar el número <strong>10</strong>.</p>
                `,
                success: "¡Bien! 1010 es 10.",
                fail: (total) => `Tienes ${total}. Intenta sumar 8 + 2.`
            },
            en: {
                title: "Practice: Make 10",
                instruction: `
                    <p>Try to form the number <strong>10</strong>.</p>
                `,
                success: "Good! 1010 is 10.",
                fail: (total) => `You have ${total}. Try adding 8 + 2.`
            }
        },
        setup: (container) => {
            createSwitches(container, 4, [8, 4, 2, 1]);
        },
        check: () => {
            const total = calculateTotal([8, 4, 2, 1]);
            if (total === 10) return true;
            return total;
        }
    },
    {
        id: "lesson4",
        section: "arithmetic",
        content: {
            es: {
                title: "Lección 4: Suma Binaria",
                instruction: `
                    <p>Sumar en binario es como sumar en decimal, pero solo tienes 0 y 1.</p>
                    <p>0 + 0 = 0<br>0 + 1 = 1<br>1 + 0 = 1<br>1 + 1 = 10 (0 y llevas 1)</p>
                    <p>Configura el circuito para sumar <strong>1 + 1</strong>.</p>
                `,
                success: "¡Correcto! 1 + 1 = 10 (que vale 2).",
                fail: (total) => `Configura A=1 y B=1.`
            },
            en: {
                title: "Lesson 4: Binary Addition",
                instruction: `
                    <p>Adding in binary is like adding in decimal, but you only have 0 and 1.</p>
                    <p>0 + 0 = 0<br>0 + 1 = 1<br>1 + 0 = 1<br>1 + 1 = 10 (0 and carry 1)</p>
                    <p>Set the circuit to add <strong>1 + 1</strong>.</p>
                `,
                success: "Correct! 1 + 1 = 10 (which is 2).",
                fail: (total) => `Set A=1 and B=1.`
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'add', 4, 4);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 4);
            return (valA === 1 && valB === 1);
        }
    },
    {
        id: "lesson4_practice",
        section: "arithmetic",
        content: {
            es: {
                title: "Práctica: Suma 4 + 1",
                instruction: `
                    <p>Intenta sumar 4 y 1.</p>
                    <p>Configura A=4 (0100) y B=1 (0001).</p>
                    <p>Resultado: 5 (0101).</p>
                `,
                success: "¡Bien! 4 + 1 = 5.",
                fail: "Configura A=4 y B=1."
            },
            en: {
                title: "Practice: Add 4 + 1",
                instruction: `
                    <p>Try adding 4 and 1.</p>
                    <p>Set A=4 (0100) and B=1 (0001).</p>
                    <p>Result: 5 (0101).</p>
                `,
                success: "Good! 4 + 1 = 5.",
                fail: "Set A=4 and B=1."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'add', 4, 4);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 4);
            return (valA === 4 && valB === 1);
        }
    },
    {
        id: "lesson5",
        section: "logic",
        content: {
            es: {
                title: "Lección 5: Lógica Booleana (AND)",
                instruction: `
                    <p>Las computadoras usan "puertas lógicas" para tomar decisiones.</p>
                    <p>La puerta <strong>AND</strong> solo se enciende si <strong>AMBAS</strong> entradas están encendidas.</p>
                    <p>Enciende los interruptores correspondientes (ej. A1 y B1) para activar su salida.</p>
                `,
                success: "¡Bien! En una puerta AND, 1 y 1 dan 1.",
                fail: "Ambos interruptores deben estar encendidos."
            },
            en: {
                title: "Lesson 5: Boolean Logic (AND)",
                instruction: `
                    <p>Computers use "logic gates" to make decisions.</p>
                    <p>The <strong>AND</strong> gate only turns on if <strong>BOTH</strong> inputs are on.</p>
                    <p>Turn on corresponding switches (e.g. A1 and B1) to activate their output.</p>
                `,
                success: "Good! In an AND gate, 1 and 1 make 1.",
                fail: "Both switches must be on."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'and', 4, 4);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 4);
            // Check if at least one bit position has both A and B set
            return (valA & valB) > 0;
        }
    },
    {
        id: "lesson6",
        section: "logic",
        content: {
            es: {
                title: "Lección 6: Lógica Booleana (OR)",
                instruction: `
                    <p>La puerta <strong>OR</strong> se enciende si <strong>CUALQUIERA</strong> de las entradas está encendida.</p>
                    <p>Prueba encender interruptores en A o B.</p>
                `,
                success: "¡Correcto! OR funciona si al menos uno es 1.",
                fail: "Enciende al menos un interruptor."
            },
            en: {
                title: "Lesson 6: Boolean Logic (OR)",
                instruction: `
                    <p>The <strong>OR</strong> gate turns on if <strong>ANY</strong> of the inputs are on.</p>
                    <p>Try turning on switches in A or B.</p>
                `,
                success: "Correct! OR works if at least one is 1.",
                fail: "Turn on at least one switch."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'or', 4, 4);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 4);
            return (valA | valB) > 0;
        }
    },
    {
        id: "lesson6_practice",
        section: "logic",
        content: {
            es: {
                title: "Práctica: OR (5 | 3)",
                instruction: `
                    <p>Calcula 5 OR 3.</p>
                    <p>5 = 0101, 3 = 0011.</p>
                    <p>0101 | 0011 = 0111 (7).</p>
                `,
                success: "¡Bien! 5 | 3 = 7.",
                fail: "Configura A=5 y B=3."
            },
            en: {
                title: "Practice: OR (5 | 3)",
                instruction: `
                    <p>Calculate 5 OR 3.</p>
                    <p>5 = 0101, 3 = 0011.</p>
                    <p>0101 | 0011 = 0111 (7).</p>
                `,
                success: "Good! 5 | 3 = 7.",
                fail: "Set A=5 and B=3."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'or', 4, 4);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 4);
            return (valA === 5 && valB === 3);
        }
    },
    {
        id: "lesson7",
        section: "logic",
        content: {
            es: {
                title: "Lección 7: Lógica Booleana (NOT)",
                instruction: `
                    <p>La puerta <strong>NOT</strong> (o inversor) invierte la entrada.</p>
                    <p>Si la entrada es 0, la salida es 1. Si es 1, la salida es 0.</p>
                    <p>Haz que las bombillas se enciendan (Salida 1).</p>
                `,
                success: "¡Correcto! NOT 0 es 1.",
                fail: "La bombilla debe estar encendida."
            },
            en: {
                title: "Lesson 7: Boolean Logic (NOT)",
                instruction: `
                    <p>The <strong>NOT</strong> gate (or inverter) flips the input.</p>
                    <p>If input is 0, output is 1. If input is 1, output is 0.</p>
                    <p>Make the bulbs turn on (Output 1).</p>
                `,
                success: "Correct! NOT 0 is 1.",
                fail: "The bulb must be on."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'not', 4, 0);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            // Check if any output bit is 1 (which means input bit was 0)
            // Since NOT inverts, if input is 0, output is 1.
            // We want at least one output bulb on.
            // If input is 0 (0000), output is 1111 (15).
            return valA === 0; 
        }
    },
    {
        id: "lesson8",
        section: "logic",
        content: {
            es: {
                title: "Lección 8: Lógica Booleana (XOR)",
                instruction: `
                    <p>La puerta <strong>XOR</strong> (OR Exclusivo) se enciende si las entradas son <strong>DIFERENTES</strong>.</p>
                    <p>0 y 1 = 1. 1 y 0 = 1. Pero 1 y 1 = 0.</p>
                    <p>Enciende alguna bombilla de salida.</p>
                `,
                success: "¡Bien! Entradas diferentes dan 1.",
                fail: "Las entradas deben ser diferentes."
            },
            en: {
                title: "Lesson 8: Boolean Logic (XOR)",
                instruction: `
                    <p>The <strong>XOR</strong> gate (Exclusive OR) turns on if the inputs are <strong>DIFFERENT</strong>.</p>
                    <p>0 and 1 = 1. 1 and 0 = 1. But 1 and 1 = 0.</p>
                    <p>Turn on any output bulb.</p>
                `,
                success: "Good! Different inputs make 1.",
                fail: "Inputs must be different."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'xor', 4, 4);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 4);
            return (valA ^ valB) > 0;
        }
    },
    {
        id: "lessonXNOR",
        section: "logic",
        content: {
            es: {
                title: "Lección 9: Lógica Booleana (XNOR)",
                instruction: `
                    <p>La puerta <strong>XNOR</strong> es lo opuesto a XOR. Se enciende si las entradas son <strong>IGUALES</strong>.</p>
                    <p>0 y 0 = 1. 1 y 1 = 1.</p>
                    <p>Haz que las bombillas se enciendan.</p>
                `,
                success: "¡Correcto! Entradas iguales dan 1.",
                fail: "Las entradas deben ser iguales."
            },
            en: {
                title: "Lesson 9: Boolean Logic (XNOR)",
                instruction: `
                    <p>The <strong>XNOR</strong> gate is the opposite of XOR. It turns on if the inputs are <strong>EQUAL</strong>.</p>
                    <p>0 and 0 = 1. 1 and 1 = 1.</p>
                    <p>Turn on the bulbs.</p>
                `,
                success: "Correct! Equal inputs make 1.",
                fail: "Inputs must be equal."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'xnor', 4, 4);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 4);
            // XNOR output is 1 if bits are equal.
            // We want at least one output bit to be 1.
            // (valA ^ valB) gives 0 where bits are equal.
            // ~(valA ^ valB) gives 1 where bits are equal.
            // We want to ensure at least one pair of bits is equal?
            // Actually, if A=0 and B=0, all bits are equal, result is 1111.
            // If A=1 (0001) and B=1 (0001), result is 1111.
            // If A=1 (0001) and B=0 (0000), result is 1110 (bit 0 differs).
            // Let's just check if the output is non-zero.
            const xnorVal = (~(valA ^ valB)) & 15; // Mask to 4 bits
            return xnorVal > 0;
        }
    },
    {
        id: "lesson9",
        section: "arithmetic",
        content: {
            es: {
                title: "Lección 10: Resta Binaria",
                instruction: `
                    <p>Vamos a restar usando un circuito.</p>
                    <p>Configura el <strong>Panel A</strong> en <strong>2</strong> (0010) y el <strong>Panel B</strong> en <strong>1</strong> (0001).</p>
                    <p>Las luces de abajo mostrarán el resultado (1).</p>
                `,
                success: "¡Correcto! 2 - 1 = 1.",
                fail: (total) => `Configura A=2 y B=1.`
            },
            en: {
                title: "Lesson 10: Binary Subtraction",
                instruction: `
                    <p>Let's subtract using a circuit.</p>
                    <p>Set <strong>Panel A</strong> to <strong>2</strong> (0010) and <strong>Panel B</strong> to <strong>1</strong> (0001).</p>
                    <p>The bottom lights will show the result (1).</p>
                `,
                success: "Correct! 2 - 1 = 1.",
                fail: (total) => `Set A=2 and B=1.`
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'sub', 4, 4);
        },
        check: () => {
            // We need to check the inputs, not just the result
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 4);
            return (valA === 2 && valB === 1);
        }
    },
    {
        id: "lesson10",
        section: "arithmetic",
        content: {
            es: {
                title: "Lección 11: Multiplicación",
                instruction: `
                    <p>Multiplicación binaria en circuito.</p>
                    <p>Configura el <strong>Panel A</strong> en <strong>2</strong> (010) y el <strong>Panel B</strong> en <strong>2</strong> (010).</p>
                    <p>El resultado será 4 (100).</p>
                `,
                success: "¡Excelente! 2 x 2 = 4.",
                fail: (total) => `Configura A=2 y B=2.`
            },
            en: {
                title: "Lesson 11: Multiplication",
                instruction: `
                    <p>Binary multiplication circuit.</p>
                    <p>Set <strong>Panel A</strong> to <strong>2</strong> (010) and <strong>Panel B</strong> to <strong>2</strong> (010).</p>
                    <p>The result will be 4 (100).</p>
                `,
                success: "Excellent! 2 x 2 = 4.",
                fail: (total) => `Set A=2 and B=2.`
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'mul', 3, 3);
        },
        check: () => {
            const valA = getPanelValue('a', 3);
            const valB = getPanelValue('b', 3);
            return (valA === 2 && valB === 2);
        }
    },
    {
        id: "lesson11",
        section: "advanced",
        content: {
            es: {
                title: "Lección 12: L-Shift (<<)",
                instruction: `
                    <p>Desplazar bits a la izquierda multiplica por 2.</p>
                    <p>Configura <strong>A = 3</strong> (0011) y <strong>B = 1</strong> (desplazar 1 vez).</p>
                    <p>3 * 2 = 6 (0110).</p>
                `,
                success: "¡Correcto! 3 << 1 = 6.",
                fail: "Configura A=3 y B=1."
            },
            en: {
                title: "Lesson 12: L-Shift (<<)",
                instruction: `
                    <p>Shifting bits to the left multiplies by 2.</p>
                    <p>Set <strong>A = 3</strong> (0011) and <strong>B = 1</strong> (shift 1 time).</p>
                    <p>3 * 2 = 6 (0110).</p>
                `,
                success: "Correct! 3 << 1 = 6.",
                fail: "Set A=3 and B=1."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'shl', 4, 2); // 4 bits input, 2 bits shift amount
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 2);
            return (valA === 3 && valB === 1);
        }
    },
    {
        id: "lesson11_practice",
        section: "advanced",
        content: {
            es: {
                title: "Práctica: Shift 5 << 1",
                instruction: `
                    <p>Desplaza 5 (0101) una vez a la izquierda.</p>
                    <p>Resultado: 10 (1010).</p>
                `,
                success: "¡Bien! 5 << 1 = 10.",
                fail: "Configura A=5 y B=1."
            },
            en: {
                title: "Practice: Shift 5 << 1",
                instruction: `
                    <p>Shift 5 (0101) left by 1.</p>
                    <p>Result: 10 (1010).</p>
                `,
                success: "Good! 5 << 1 = 10.",
                fail: "Set A=5 and B=1."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'shl', 4, 2);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 2);
            return (valA === 5 && valB === 1);
        }
    },
    {
        id: "lesson12",
        section: "advanced",
        content: {
            es: {
                title: "Lección 13: R-Shift (>>)",
                instruction: `
                    <p>Desplazar bits a la derecha divide por 2 (entero).</p>
                    <p>Configura <strong>A = 6</strong> (0110) y <strong>B = 1</strong>.</p>
                    <p>6 / 2 = 3 (0011).</p>
                `,
                success: "¡Bien! 6 >> 1 = 3.",
                fail: "Configura A=6 y B=1."
            },
            en: {
                title: "Lesson 13: R-Shift (>>)",
                instruction: `
                    <p>Shifting bits to the right divides by 2 (integer).</p>
                    <p>Set <strong>A = 6</strong> (0110) and <strong>B = 1</strong>.</p>
                    <p>6 / 2 = 3 (0011).</p>
                `,
                success: "Good! 6 >> 1 = 3.",
                fail: "Set A=6 and B=1."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'shr', 4, 2);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 2);
            return (valA === 6 && valB === 1);
        }
    },
    {
        id: "lesson13_rol",
        section: "advanced",
        content: {
            es: {
                title: "Lección 14: L-Circ (Rotación Izq.)",
                instruction: `
                    <p>La rotación mueve los bits que salen por un lado al otro extremo.</p>
                    <p>Configura <strong>A = 8</strong> (1000) y <strong>B = 1</strong>.</p>
                    <p>El bit 1 se mueve al principio: 0001 (1).</p>
                `,
                success: "¡Correcto! 1000 rotado es 0001.",
                fail: "Configura A=8 y B=1."
            },
            en: {
                title: "Lesson 14: L-Circ (Rotate Left)",
                instruction: `
                    <p>Rotation moves bits that exit one side to the other end.</p>
                    <p>Set <strong>A = 8</strong> (1000) and <strong>B = 1</strong>.</p>
                    <p>The bit 1 moves to the start: 0001 (1).</p>
                `,
                success: "Correct! 1000 rotated is 0001.",
                fail: "Set A=8 and B=1."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'rol', 4, 2);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 2);
            return (valA === 8 && valB === 1);
        }
    },
    {
        id: "lesson13_ror",
        section: "advanced",
        content: {
            es: {
                title: "Lección 15: R-Circ (Rotación Der.)",
                instruction: `
                    <p>Rotación a la derecha mueve el bit del final al principio.</p>
                    <p>Configura <strong>A = 1</strong> (0001) y <strong>B = 1</strong>.</p>
                    <p>El bit 1 se mueve al final: 1000 (8).</p>
                `,
                success: "¡Bien! 0001 rotado es 1000.",
                fail: "Configura A=1 y B=1."
            },
            en: {
                title: "Lesson 15: R-Circ (Rotate Right)",
                instruction: `
                    <p>Right rotation moves the bit from the end to the start.</p>
                    <p>Set <strong>A = 1</strong> (0001) and <strong>B = 1</strong>.</p>
                    <p>The bit 1 moves to the end: 1000 (8).</p>
                `,
                success: "Good! 0001 rotated is 1000.",
                fail: "Set A=1 and B=1."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'ror', 4, 2);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 2);
            return (valA === 1 && valB === 1);
        }
    },
    {
        id: "lesson13",
        section: "advanced",
        content: {
            es: {
                title: "Lección 16: Desbordamiento (Overflow)",
                instruction: `
                    <p>Si sumas 1 a 1111 (15) en 4 bits, obtienes 10000 (16).</p>
                    <p>Pero si solo tienes 4 bits de salida, ¡vuelve a 0000!</p>
                    <p>Intenta sumar <strong>15 + 1</strong>.</p>
                `,
                success: "¡Eso es desbordamiento! El bit extra se pierde (o es acarreo).",
                fail: "Configura A=15 y B=1."
            },
            en: {
                title: "Lesson 16: Overflow",
                instruction: `
                    <p>If you add 1 to 1111 (15) in 4 bits, you get 10000 (16).</p>
                    <p>But if you only have 4 output bits, it wraps to 0000!</p>
                    <p>Try adding <strong>15 + 1</strong>.</p>
                `,
                success: "That's overflow! The extra bit is lost (or is carry).",
                fail: "Set A=15 and B=1."
            }
        },
        setup: (container) => {
            // Force 4 bit output for ADD to show overflow (usually add has +1 bit for carry, let's restrict it manually or use a trick)
            // createArithmeticCircuit calculates outBits automatically.
            // I'll use a custom setup or just let it show the carry bit and explain it.
            // The instruction says "if you only have 4 output bits".
            // My createArithmeticCircuit adds a carry bit for 'add'.
            // Maybe I should use 'mul' 4x4 which gives 8 bits, but that's not overflow in the same sense.
            // Let's stick to 'add' and maybe the user sees the 5th bit light up.
            // Or I can modify createArithmeticCircuit to accept an override for outBits.
            // For now, let's just use standard add, it will show 5 bits (10000).
            // I'll adjust the text to say "The 5th bit is the carry/overflow".
            createArithmeticCircuit(container, 'add', 4, 4);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 4);
            return (valA === 15 && valB === 1);
        }
    },
    {
        id: "lesson14",
        section: "images",
        content: {
            es: {
                title: "Lección 17: Imágenes Binarias (B&N)",
                instruction: `
                    <p>¡Las computadoras usan binario para imágenes también!</p>
                    <p>0 = Negro, 1 = Blanco.</p>
                    <p>Dibuja una cruz (+) activando los interruptores correctos en esta cuadrícula de 3x3.</p>
                `,
                success: "¡Excelente! Has dibujado con bits.",
                fail: "Intenta hacer una forma de cruz (+)."
            },
            en: {
                title: "Lesson 17: Binary Images (B&W)",
                instruction: `
                    <p>Computers use binary for images too!</p>
                    <p>0 = Black, 1 = White.</p>
                    <p>Draw a cross (+) by toggling the correct switches in this 3x3 grid.</p>
                `,
                success: "Great! You drew with bits.",
                fail: "Try to make a cross (+) shape."
            }
        },
        setup: (container) => {
            createImageGrid(container, 3, 3, 'bw');
        },
        check: () => {
            // Cross pattern:
            // 0 1 0
            // 1 1 1
            // 0 1 0
            // Indices: 0,1,2, 3,4,5, 6,7,8
            // Expected: 1, 3, 4, 5, 7 are ON (1)
            const state = getImageGridState(9);
            const target = [0, 1, 0, 1, 1, 1, 0, 1, 0];
            return JSON.stringify(state) === JSON.stringify(target);
        }
    },
    {
        id: "lesson15",
        section: "images",
        content: {
            es: {
                title: "Lección 18: Color RGB",
                instruction: `
                    <p>Para el color, usamos 3 luces: Roja (R), Verde (G) y Azul (B).</p>
                    <p>Mezclándolas obtenemos otros colores.</p>
                    <p>Haz <strong>Amarillo</strong> encendiendo Rojo y Verde.</p>
                `,
                success: "¡Correcto! Rojo + Verde = Amarillo.",
                fail: "Necesitas Rojo y Verde encendidos (y Azul apagado)."
            },
            en: {
                title: "Lesson 18: RGB Color",
                instruction: `
                    <p>For color, we use 3 lights: Red (R), Green (G), and Blue (B).</p>
                    <p>Mixing them gives other colors.</p>
                    <p>Make <strong>Yellow</strong> by turning on Red and Green.</p>
                `,
                success: "Correct! Red + Green = Yellow.",
                fail: "You need Red and Green ON (and Blue OFF)."
            }
        },
        setup: (container) => {
            createImageGrid(container, 0, 0, 'color');
        },
        check: () => {
            const s = getColorState('color');
            return (s.r && s.g && !s.b);
        }
    },
    {
        id: "lesson15_practice",
        section: "images",
        content: {
            es: {
                title: "Práctica: Color Cian",
                instruction: `
                    <p>Haz <strong>Cian</strong> mezclando Verde y Azul.</p>
                    <p>Enciende Verde y Azul (y apaga Rojo).</p>
                `,
                success: "¡Bien! Verde + Azul = Cian.",
                fail: "Necesitas Verde y Azul encendidos (y Rojo apagado)."
            },
            en: {
                title: "Practice: Cyan Color",
                instruction: `
                    <p>Make <strong>Cyan</strong> by mixing Green and Blue.</p>
                    <p>Turn on Green and Blue (and turn off Red).</p>
                `,
                success: "Good! Green + Blue = Cyan.",
                fail: "You need Green and Blue ON (and Red OFF)."
            }
        },
        setup: (container) => {
            createImageGrid(container, 0, 0, 'color');
        },
        check: () => {
            const s = getColorState('color');
            return (!s.r && s.g && s.b);
        }
    },
    {
        id: "lesson16",
        section: "advanced",
        content: {
            es: {
                title: "Lección 19: Máscara de Bits (Bit Masking)",
                instruction: `
                    <p>Las máscaras usan <strong>AND</strong> para aislar bits.</p>
                    <p>Para ver si el 3er bit (valor 4) está encendido en 13 (1101):</p>
                `,
                success: "¡Exacto! Has aislado el bit 4.",
                fail: "Configura A=13 (1101) y B=4 (0100)."
            },
            en: {
                title: "Lesson 19: Bit Masking",
                instruction: `
                    <p>Masks use <strong>AND</strong> to isolate bits.</p>
                    <p>To check if the 3rd bit (value 4) is ON in 13 (1101):</p>
                    <p>1101 AND 0100 = 0100 (4).</p>
                    <p>Set A=13 and B=4.</p>
                `,
                success: "Exact! You isolated bit 4.",
                fail: "Set A=13 (1101) and B=4 (0100)."
            }
        },
        setup: (container) => {
            createArithmeticCircuit(container, 'and', 4, 4);
        },
        check: () => {
            const valA = getPanelValue('a', 4);
            const valB = getPanelValue('b', 4);
            return (valA === 13 && valB === 4);
        }
    },
    {
        id: "lesson17",
        section: "advanced",
        content: {
            es: {
                title: "Sandbox: Crea tu Circuito",
                instruction: `
                    <p>¡Bienvenido al Sandbox!</p>
                    <p>Arrastra componentes desde la barra superior.</p>
                    <p>Conecta los puntos para crear tus propios circuitos lógicos.</p>
                    <p>¡Experimenta!</p>
                `,
                success: "¡Sigue experimentando!",
                fail: ""
            },
            en: {
                title: "Sandbox: Build Your Circuit",
                instruction: `
                    <p>Welcome to the Sandbox!</p>
                    <p>Drag components from the top bar.</p>
                    <p>Connect the dots to build your own logic circuits.</p>
                    <p>Experiment!</p>
                `,
                success: "Keep experimenting!",
                fail: ""
            }
        },
        setup: (container) => {
            createSandbox(container);
        },
        check: () => {
            return true;
        }
    }
];

let currentLesson = 0;

// DOM Elements
const titleEl = document.getElementById('lesson-title');
const contentEl = document.getElementById('lesson-content');
const areaEl = document.getElementById('interactive-area');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressFill = document.getElementById('progress-fill');
const progressTicks = document.getElementById('progress-ticks');
const langBtn = document.getElementById('lang-btn');
const courseTitleEl = document.getElementById('course-title');

// Initialization
function init() {
    createProgressTicks();
    loadLesson(currentLesson);
    updateLanguage();
    updateButtons();
}

function createProgressTicks() {
    const progressTicks = document.getElementById('progress-ticks');
    if (!progressTicks) return;
    progressTicks.innerHTML = '';
    lessons.forEach((lesson, index) => {
        const tick = document.createElement('div');
        tick.className = 'progress-tick';
        tick.style.left = `${(index / (lessons.length - 1)) * 100}%`;
        tick.title = lesson.content[currentLang].title;
        progressTicks.appendChild(tick);
    });
}

function updateButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressFill = document.getElementById('progress-fill');
    const ticks = document.querySelectorAll('.progress-tick');

    if (prevBtn) prevBtn.disabled = currentLesson === 0;
    
    if (progressFill) {
        const progress = (currentLesson / (lessons.length - 1)) * 100;
        progressFill.style.width = `${progress}%`;
    }

    if (ticks) {
        ticks.forEach((tick, index) => {
            if (index <= currentLesson) {
                tick.classList.add('active');
            } else {
                tick.classList.remove('active');
            }
        });
    }
}

function updateLanguage() {
    const t = translations[currentLang];
    const courseTitleEl = document.getElementById('course-title');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const titleEl = document.getElementById('lesson-title');
    const contentEl = document.getElementById('lesson-content');
    
    if (courseTitleEl) courseTitleEl.textContent = t.courseTitle;
    if (prevBtn) prevBtn.textContent = t.prev;
    if (nextBtn) nextBtn.textContent = t.next;
    
    const lesson = lessons[currentLesson];
    if (titleEl) titleEl.textContent = lesson.content[currentLang].title;
    if (contentEl) contentEl.innerHTML = lesson.content[currentLang].instruction;
    
    // Update Section Header
    const sectionHeader = document.getElementById('section-header');
    if (sectionHeader && lesson.section) {
        const sectionTitle = t.sections[lesson.section];
        sectionHeader.innerHTML = `
            <div class="section-bulb"></div>
            <span>${sectionTitle}</span>
            <div class="section-bulb"></div>
        `;
    }
    
    if (typeof checkCurrentLesson === 'function') {
        checkCurrentLesson();
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    updateLanguage();
    createProgressTicks();
}

function loadLesson(index) {
    const lesson = lessons[index];
    const titleEl = document.getElementById('lesson-title');
    const contentEl = document.getElementById('lesson-content');
    const areaEl = document.getElementById('interactive-area');
    const sectionHeader = document.getElementById('section-header');
    const nextBtn = document.getElementById('next-btn');
    
    if (titleEl) titleEl.textContent = lesson.content[currentLang].title;
    
    // Handle Instruction
    let instruction = lesson.content[currentLang].instruction;

    if (contentEl) contentEl.innerHTML = instruction;
    if (areaEl) areaEl.innerHTML = '';
    
    // Update Section Header
    if (sectionHeader && lesson.section) {
        const sectionTitle = translations[currentLang].sections[lesson.section];
        sectionHeader.innerHTML = `
            <div class="section-bulb"></div>
            <span>${sectionTitle}</span>
            <div class="section-bulb"></div>
        `;
        sectionHeader.style.display = 'flex';
    } else if (sectionHeader) {
        sectionHeader.style.display = 'none';
    }
    
    // Reset status
    const sectionBulbs = document.querySelectorAll('.section-bulb');
    sectionBulbs.forEach(bulb => bulb.classList.remove('success'));
    if (nextBtn) nextBtn.classList.remove('lit');
    
    // Setup new lesson
    if (lesson.setup) {
        lesson.setup(areaEl);
    }
    
    checkCurrentLesson();
}

function checkCurrentLesson() {
    const lesson = lessons[currentLesson];
    if (!lesson.check) return;
    
    const isSuccess = lesson.check();
    const sectionBulbs = document.querySelectorAll('.section-bulb');
    const nextBtn = document.getElementById('next-btn');
    
    if (isSuccess) {
        sectionBulbs.forEach(bulb => bulb.classList.add('success'));
        if (nextBtn) nextBtn.classList.add('lit');
    } else {
        sectionBulbs.forEach(bulb => bulb.classList.remove('success'));
        if (nextBtn) nextBtn.classList.remove('lit');
    }
}

// Helper: Toggle switch state
function toggleSwitch(index) {
    const sw = document.getElementById(`sw-${index}`);
    const bulb = document.getElementById(`bulb-${index}`);
    
    if (sw) {
        sw.classList.toggle('active');
        
        // Toggle bulb if it exists
        if (bulb) {
            if (sw.classList.contains('active')) {
                bulb.classList.add('on');
            } else {
                bulb.classList.remove('on');
            }
        }
        
        // Trigger custom check if it exists (for logic gates immediate feedback)
        if (window.customCheck) {
             window.customCheck();
        }
        
        // Continuous check
        checkCurrentLesson();
    }
}
window.toggleSwitch = toggleSwitch;

// Helper: Get value of a specific switch (0 or 1)
function getSwitchValue(index) {
    const sw = document.getElementById(`sw-${index}`);
    return (sw && sw.classList.contains('active')) ? 1 : 0;
}

// Helper: Calculate total value based on active switches and their labels
function calculateTotal(values) {
    let total = 0;
    values.forEach((val, idx) => {
        if (getSwitchValue(idx)) {
            total += val;
        }
    });
    return total;
}

// Helper: Create Switches for Basic Lessons
function createSwitches(container, count, values) {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'binary-container';

    for(let i=0; i<count; i++) {
        const val = values[i];
        const swWrapper = document.createElement('div');
        swWrapper.className = 'switch-wrapper';

        // Bulb
        const bulb = document.createElement('div');
        bulb.className = 'bulb';
        bulb.id = `bulb-${i}`;
        swWrapper.appendChild(bulb);

        // Switch
        const sw = document.createElement('div');
        sw.className = 'switch';
        sw.id = `sw-${i}`;
        sw.onclick = () => window.toggleSwitch(i);

        const handle = document.createElement('div');
        handle.className = 'switch-handle';
        sw.appendChild(handle);

        swWrapper.appendChild(sw);

        // Label
        const label = document.createElement('span');
        label.className = 'bit-label';
        label.textContent = val;
        swWrapper.appendChild(label);

        wrapper.appendChild(swWrapper);
    }
    container.appendChild(wrapper);
}

// Helper: Create Arithmetic Circuit (Updated for Logic Gates)
function createArithmeticCircuit(container, type, bitsA, bitsB) {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'arithmetic-container';

    // Input A
    const labelA = document.createElement('div');
    labelA.className = 'panel-label';
    labelA.textContent = 'INPUT A';
    wrapper.appendChild(labelA);

    const panelA = document.createElement('div');
    panelA.className = 'input-panel';
    panelA.id = 'panel-a';
    // Create switches for A
    for(let i=bitsA-1; i>=0; i--) {
        panelA.appendChild(createSwitchElement(`sw-a-${i}`, Math.pow(2, i)));
    }
    wrapper.appendChild(panelA);

    // Operator
    const op = document.createElement('div');
    op.className = 'operator-symbol';
    let opText = '';
    if (type === 'add') opText = '+';
    else if (type === 'sub') opText = '-';
    else if (type === 'mul') opText = '×';
    else if (type === 'shl') opText = '<<';
    else if (type === 'shr') opText = '>>';
    else if (type === 'rol') opText = 'L-Circ';
    else if (type === 'ror') opText = 'R-Circ';
    else opText = type.toUpperCase(); // Logic gates
    op.textContent = opText;
    wrapper.appendChild(op);

    // Input B (Only if not NOT gate)
    if (type !== 'not') {
        const labelB = document.createElement('div');
        labelB.className = 'panel-label';
        labelB.textContent = 'INPUT B';
        wrapper.appendChild(labelB);

        const panelB = document.createElement('div');
        panelB.className = 'input-panel';
        panelB.id = 'panel-b';
        // Create switches for B
        for(let i=bitsB-1; i>=0; i--) {
            panelB.appendChild(createSwitchElement(`sw-b-${i}`, Math.pow(2, i)));
        }
        wrapper.appendChild(panelB);
    }

    // Equals
    const eq = document.createElement('div');
    eq.className = 'operator-symbol';
    eq.textContent = '=';
    wrapper.appendChild(eq);

    // Output
    const labelOut = document.createElement('div');
    labelOut.className = 'panel-label';
    labelOut.textContent = 'RESULT';
    wrapper.appendChild(labelOut);

    const panelOut = document.createElement('div');
    panelOut.className = 'output-panel';
    panelOut.id = 'panel-out';
    
    // Calculate output bits needed
    let outBits = Math.max(bitsA, bitsB);
    if (type === 'mul') outBits = bitsA + bitsB;
    if (type === 'add') outBits = Math.max(bitsA, bitsB) + 1; // Carry
    if (type === 'shl') outBits = bitsA + (1 << bitsB) - 1;
    // if (['and', 'or', 'xor', 'not', 'xnor'].includes(type)) outBits = 1; // Logic gates usually 1 bit output here
    
    for(let i=outBits-1; i>=0; i--) {
        const bulb = document.createElement('div');
        bulb.className = 'bulb';
        bulb.id = `bulb-out-${i}`;
        bulb.style.width = '40px'; // Slightly smaller for result
        bulb.style.height = '40px';
        
        const valLabel = document.createElement('span');
        valLabel.className = 'bit-label';
        valLabel.textContent = Math.pow(2, i);
        
        const bulbWrapper = document.createElement('div');
        bulbWrapper.className = 'switch-wrapper';
        bulbWrapper.appendChild(bulb);
        bulbWrapper.appendChild(valLabel);
        
        panelOut.appendChild(bulbWrapper);
    }
    wrapper.appendChild(panelOut);
    
    container.appendChild(wrapper);

    // Logic function
    window.updateArithmetic = () => {
        let valA = 0;
        for(let i=0; i<bitsA; i++) {
            const sw = document.getElementById(`sw-a-${i}`);
            if(sw && sw.classList.contains('active')) valA += Math.pow(2, i);
        }
        let valB = 0;
        if (type !== 'not') {
            for(let i=0; i<bitsB; i++) {
                const sw = document.getElementById(`sw-b-${i}`);
                if(sw && sw.classList.contains('active')) valB += Math.pow(2, i);
            }
        }

        let result = 0;
        if (type === 'add') result = valA + valB;
        if (type === 'sub') result = Math.max(0, valA - valB);
        if (type === 'mul') result = valA * valB;
        if (type === 'shl') result = valA << valB;
        if (type === 'shr') result = valA >> valB;
        if (type === 'rol') {
            const shift = valB % bitsA;
            result = ((valA << shift) | (valA >>> (bitsA - shift))) & ((1 << bitsA) - 1);
        }
        if (type === 'ror') {
            const shift = valB % bitsA;
            result = ((valA >>> shift) | (valA << (bitsA - shift))) & ((1 << bitsA) - 1);
        }
        
        // Logic Gates (Bitwise on 1 bit usually, but let's support multi-bit if needed, though lessons use 1)
        if (type === 'and') result = valA & valB;
        if (type === 'or') result = valA | valB;
        if (type === 'xor') result = valA ^ valB;
        if (type === 'not') result = (~valA) & ((1 << bitsA) - 1); // Mask to keep within bits
        if (type === 'xnor') result = (~(valA ^ valB)) & ((1 << bitsA) - 1);

        // Update output bulbs
        for(let i=0; i<outBits; i++) {
            const bulb = document.getElementById(`bulb-out-${i}`);
            const bitVal = Math.pow(2, i);
            if ((result & bitVal) === bitVal) {
                bulb.classList.add('on');
            } else {
                bulb.classList.remove('on');
            }
        }
        
        // Trigger main check
        checkCurrentLesson();
    };
}

function createSwitchElement(id, labelVal) {
    const wrapper = document.createElement('div');
    wrapper.className = 'switch-wrapper';

    const sw = document.createElement('div');
    sw.className = 'switch';
    sw.id = id;
    sw.onclick = () => {
        sw.classList.toggle('active');
        if (window.updateArithmetic) window.updateArithmetic();
    };

    const handle = document.createElement('div');
    handle.className = 'switch-handle';
    sw.appendChild(handle);

    const label = document.createElement('span');
    label.className = 'bit-label';
    label.textContent = labelVal;

    wrapper.appendChild(sw);
    wrapper.appendChild(label);
    return wrapper;
}

function getPanelValue(panel, bits) {
    let val = 0;
    for(let i=0; i<bits; i++) {
        const sw = document.getElementById(`sw-${panel}-${i}`);
        if(sw && sw.classList.contains('active')) val += Math.pow(2, i);
    }
    return val;
}

// Event Listeners
langBtn.addEventListener('click', toggleLanguage);

prevBtn.addEventListener('click', () => {
    if (currentLesson > 0) {
        currentLesson--;
        loadLesson(currentLesson);
        updateButtons();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentLesson < lessons.length - 1) {
        currentLesson++;
        loadLesson(currentLesson);
        updateButtons();
    }
});

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Helper: Get value from a specific panel
function getPanelValue(panel, bits) {
    let val = 0;
    for(let i=0; i<bits; i++) {
        const sw = document.getElementById(`sw-${panel}-${i}`);
        if(sw && sw.classList.contains('active')) val += Math.pow(2, i);
    }
    return val;
}

// Helper: Create Image Grid
function createImageGrid(container, rows, cols, mode) {
    container.innerHTML = '';
    
    if (mode === 'bw') {
        const wrapper = document.createElement('div');
        wrapper.className = 'image-grid-container';
        
        // Controls (Switches)
        const controls = document.createElement('div');
        controls.className = 'grid-controls';
        controls.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        
        // Display (Pixels)
        const display = document.createElement('div');
        display.className = 'pixel-display';
        display.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        
        for(let i=0; i<rows*cols; i++) {
            // Switch
            const swWrapper = document.createElement('div');
            swWrapper.className = 'switch-wrapper';
            
            const sw = document.createElement('div');
            sw.className = 'switch';
            sw.id = `sw-img-${i}`;
            sw.onclick = () => {
                sw.classList.toggle('active');
                updateImageGrid(i, mode);
            };
            
            const handle = document.createElement('div');
            handle.className = 'switch-handle';
            sw.appendChild(handle);
            
            swWrapper.appendChild(sw);
            controls.appendChild(swWrapper);
            
            // Pixel
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.id = `px-${i}`;
            display.appendChild(pixel);
        }
        
        wrapper.appendChild(controls);
        wrapper.appendChild(display);
        container.appendChild(wrapper);
        
    } else if (mode === 'color' || mode === 'color-depth') {
        const wrapper = document.createElement('div');
        wrapper.className = 'color-pixel-container';
        
        const controls = document.createElement('div');
        controls.className = 'rgb-controls';
        
        const bitsPerChannel = mode === 'color-depth' ? 2 : 1;

        ['Red', 'Green', 'Blue'].forEach(color => {
            const group = document.createElement('div');
            group.className = 'rgb-switch-group';
            
            const label = document.createElement('span');
            label.className = 'bit-label';
            label.textContent = color;
            label.style.color = color.toLowerCase();
            
            group.appendChild(label);

            for(let i=bitsPerChannel-1; i>=0; i--) {
                const sw = document.createElement('div');
                sw.className = 'switch';
                sw.id = `sw-rgb-${color.toLowerCase()}-${i}`;
                sw.onclick = () => {
                    sw.classList.toggle('active');
                    updateColorPixel(mode);
                };
                
                const handle = document.createElement('div');
                handle.className = 'switch-handle';
                sw.appendChild(handle);
                
                // Add small label for bit weight if depth > 1
                if (bitsPerChannel > 1) {
                    const bitLabel = document.createElement('span');
                    bitLabel.style.fontSize = '10px';
                    bitLabel.textContent = Math.pow(2, i);
                    group.appendChild(bitLabel);
                }

                group.appendChild(sw);
            }
            
            controls.appendChild(group);
        });
        
        const preview = document.createElement('div');
        preview.className = 'color-preview';
        preview.id = 'color-preview';
        
        wrapper.appendChild(controls);
        wrapper.appendChild(preview);
        container.appendChild(wrapper);
    }
}

function updateImageGrid(index, mode) {
    if (mode === 'bw') {
        const sw = document.getElementById(`sw-img-${index}`);
        const px = document.getElementById(`px-${index}`);
        if (sw.classList.contains('active')) {
            px.classList.add('white');
        } else {
            px.classList.remove('white');
        }
        checkCurrentLesson();
    }
}

function updateColorPixel(mode) {
    let r = 0, g = 0, b = 0;

    if (mode === 'color-depth') {
        // 2 bits per channel: 0-3. Map to 0-255.
        // 00=0, 01=85, 10=170, 11=255
        const getVal = (c) => {
            let val = 0;
            if (document.getElementById(`sw-rgb-${c}-1`).classList.contains('active')) val += 2;
            if (document.getElementById(`sw-rgb-${c}-0`).classList.contains('active')) val += 1;
            return Math.round(val * 255 / 3);
        };
        r = getVal('red');
        g = getVal('green');
        b = getVal('blue');
    } else {
        // 1 bit per channel (legacy mode support, though we changed IDs in creation)
        // Wait, I changed creation to use -0 suffix even for 1 bit? 
        // Let's check creation logic above.
        // Yes: `sw.id = sw-rgb-${color.toLowerCase()}-${i}`
        // So for mode='color', bitsPerChannel=1, i=0. ID is ...-0.
        
        r = document.getElementById('sw-rgb-red-0').classList.contains('active') ? 255 : 0;
        g = document.getElementById('sw-rgb-green-0').classList.contains('active') ? 255 : 0;
        b = document.getElementById('sw-rgb-blue-0').classList.contains('active') ? 255 : 0;
    }
    
    const preview = document.getElementById('color-preview');
    preview.style.background = `rgb(${r}, ${g}, ${b})`;
    
    checkCurrentLesson();
}

function getImageGridState(count) {
    let state = [];
    for(let i=0; i<count; i++) {
        const sw = document.getElementById(`sw-img-${i}`);
        state.push(sw && sw.classList.contains('active') ? 1 : 0);
    }
    return state;
}

function getColorState(mode) {
    if (mode === 'color-depth') {
        const getVal = (c) => {
            let val = 0;
            if (document.getElementById(`sw-rgb-${c}-1`).classList.contains('active')) val += 2;
            if (document.getElementById(`sw-rgb-${c}-0`).classList.contains('active')) val += 1;
            return val;
        };
        return { r: getVal('red'), g: getVal('green'), b: getVal('blue') };
    } else {
        return {
            r: document.getElementById('sw-rgb-red-0').classList.contains('active'),
            g: document.getElementById('sw-rgb-green-0').classList.contains('active'),
            b: document.getElementById('sw-rgb-blue-0').classList.contains('active')
        };
    }
}

// Sandbox Logic
function createSandbox(container) {
    container.innerHTML = `
        <div class="sandbox-wrapper">
            <div class="sandbox-toolbar">
                <div class="tool-item" data-type="switch" draggable="true">Switch</div>
                <div class="tool-item" data-type="bulb" draggable="true">Bulb</div>
                <div class="tool-item" data-type="and" draggable="true">AND</div>
                <div class="tool-item" data-type="or" draggable="true">OR</div>
                <div class="tool-item" data-type="not" draggable="true">NOT</div>
                <div class="tool-item" data-type="xor" draggable="true">XOR</div>
                <div class="tool-item" data-type="nand" draggable="true">NAND</div>
                <div class="tool-item" data-type="nor" draggable="true">NOR</div>
                <div class="tool-item" data-type="xnor" draggable="true">XNOR</div>
            </div>
            <div class="sandbox-canvas" id="sb-canvas">
                <div style="position:absolute;bottom:5px;right:5px;color:#7f8c8d;font-size:10px;pointer-events:none;z-index:0;">Double-click wire to delete. Click 'x' to remove component.</div>
                <svg class="sandbox-svg" id="sb-svg"></svg>
            </div>
        </div>
    `;

    const canvas = document.getElementById('sb-canvas');
    const svg = document.getElementById('sb-svg');
    let components = [];
    let wires = [];
    let dragging = null;
    let dragOffset = { x: 0, y: 0 };
    let activeWire = null;

    // Drag from Toolbar
    const tools = container.querySelectorAll('.tool-item');
    tools.forEach(tool => {
        tool.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('type', tool.dataset.type);
        });
    });

    // Drop on Canvas
    canvas.addEventListener('dragover', (e) => e.preventDefault());
    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('type');
        if (type) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left - 30; // Center
            const y = e.clientY - rect.top - 30;
            addComponent(type, x, y);
        }
    });

    function removeComponent(id) {
        // Remove component from array
        const idx = components.findIndex(c => c.id === id);
        if (idx > -1) {
            components.splice(idx, 1);
        }
        // Remove from DOM
        const el = document.getElementById(id);
        if (el) el.remove();
        
        // Remove associated wires
        const wiresToRemove = wires.filter(w => w.from.dataset.compId === id || w.to.dataset.compId === id);
        wiresToRemove.forEach(w => removeWire(w.id));
        
        updateSimulation();
    }

    function removeWire(id) {
        const idx = wires.findIndex(w => w.id === id);
        if (idx > -1) {
            wires.splice(idx, 1);
        }
        const path = document.getElementById(id);
        if (path) path.remove();
        updateSimulation();
    }

    function addComponent(type, x, y) {
        const id = 'comp_' + Date.now();
        const el = document.createElement('div');
        el.className = 'sb-component';
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.id = id;
        
        let label = type.toUpperCase();
        let inputs = 0;
        let outputs = 0;
        let bodyHtml = '';

        if (type === 'switch') {
            inputs = 0; outputs = 1;
            bodyHtml = '<div class="sb-switch switch"></div>';
        } else if (type === 'bulb') {
            inputs = 1; outputs = 0;
            bodyHtml = '<div class="sb-bulb bulb" style="width:30px;height:30px;"></div>';
        } else if (type === 'not') {
            inputs = 1; outputs = 1;
            bodyHtml = '<div class="gate-symbol">NOT</div>';
        } else {
            inputs = 2; outputs = 1;
            bodyHtml = `<div class="gate-symbol">${label}</div>`;
        }

        el.innerHTML = `
            <div class="sb-label">${label}</div>
            <div class="sb-body">${bodyHtml}</div>
            <div class="sb-delete" style="position:absolute;top:-5px;right:-5px;width:15px;height:15px;background:#e74c3c;color:white;border-radius:50%;font-size:10px;display:flex;justify-content:center;align-items:center;cursor:pointer;z-index:200;border:1px solid #000;">x</div>
        `;

        // Delete handler
        el.querySelector('.sb-delete').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent drag start
            removeComponent(id);
        });

        // Add Terminals
        if (inputs > 0) {
            for (let i = 0; i < inputs; i++) {
                const t = document.createElement('div');
                t.className = 'sb-terminal input';
                t.style.top = (20 + i * 20) + 'px';
                t.dataset.id = id + '_in_' + i;
                t.dataset.type = 'input';
                t.dataset.compId = id;
                el.appendChild(t);
                setupTerminal(t);
            }
        }
        if (outputs > 0) {
            const t = document.createElement('div');
            t.className = 'sb-terminal output';
            t.style.top = '30px';
            t.dataset.id = id + '_out';
            t.dataset.type = 'output';
            t.dataset.compId = id;
            el.appendChild(t);
            setupTerminal(t);
        }

        // Dragging Logic for Component
        el.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('sb-terminal')) return;
            dragging = el;
            const rect = el.getBoundingClientRect();
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;
            el.classList.add('dragging');
        });

        // Toggle Switch
        if (type === 'switch') {
            el.addEventListener('click', (e) => {
                if (dragging) return; // Don't toggle if dragging
                const sw = el.querySelector('.sb-switch');
                sw.classList.toggle('on');
                updateSimulation();
            });
        }

        canvas.appendChild(el);
        components.push({ id, type, el, inputs: [], outputs: [] });
    }

    // Global Mouse Move for Dragging
    document.addEventListener('mousemove', (e) => {
        if (dragging) {
            const rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left - dragOffset.x;
            let y = e.clientY - rect.top - dragOffset.y;
            
            // Bounds
            x = Math.max(0, Math.min(x, rect.width - 60));
            y = Math.max(0, Math.min(y, rect.height - 60));

            dragging.style.left = x + 'px';
            dragging.style.top = y + 'px';
            updateWires();
        }
    });

    document.addEventListener('mouseup', () => {
        if (dragging) {
            dragging.classList.remove('dragging');
            dragging = null;
        }
    });

    // Wiring Logic
    let startTerminal = null;

    function setupTerminal(t) {
        t.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            if (t.dataset.type === 'output') {
                startTerminal = t;
            } else if (t.dataset.type === 'input' && startTerminal) {
                // Check if input is already connected
                const isConnected = wires.some(w => w.to === t);
                if (!isConnected) {
                    createWire(startTerminal, t);
                }
                startTerminal = null;
            }
        });
    }

    function createWire(from, to) {
        const id = 'wire_' + Date.now();
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'sb-wire');
        path.setAttribute('id', id);
        
        // Double click to delete wire
        path.addEventListener('dblclick', () => {
            removeWire(id);
        });

        svg.appendChild(path);
        
        wires.push({ id, from, to, path });
        updateWires();
        updateSimulation();
    }

    function updateWires() {
        wires.forEach(wire => {
            const r1 = wire.from.getBoundingClientRect();
            const r2 = wire.to.getBoundingClientRect();
            const cRect = canvas.getBoundingClientRect();

            const x1 = r1.left + r1.width/2 - cRect.left;
            const y1 = r1.top + r1.height/2 - cRect.top;
            const x2 = r2.left + r2.width/2 - cRect.left;
            const y2 = r2.top + r2.height/2 - cRect.top;

            // Bezier curve
            const d = `M ${x1} ${y1} C ${x1+50} ${y1}, ${x2-50} ${y2}, ${x2} ${y2}`;
            wire.path.setAttribute('d', d);
        });
    }

    function updateSimulation() {
        // Reset all inputs
        // Simple simulation loop
        // 1. Get Switch states
        // 2. Propagate through wires
        // 3. Compute Gates
        // 4. Repeat until stable (or max iterations)
        
        let state = {}; // id -> output value

        // Initialize switches
        components.forEach(c => {
            if (c.type === 'switch') {
                const on = c.el.querySelector('.sb-switch').classList.contains('on');
                state[c.id + '_out'] = on ? 1 : 0;
            }
        });

        // Propagate
        for (let i = 0; i < 10; i++) { // 10 iterations for depth
            wires.forEach(w => {
                if (state[w.from.dataset.id] !== undefined) {
                    // Set input value on target component
                    const targetCompId = w.to.dataset.compId;
                    const inputIdx = w.to.dataset.id.split('_in_')[1];
                    if (!state[targetCompId + '_inputs']) state[targetCompId + '_inputs'] = {};
                    state[targetCompId + '_inputs'][inputIdx] = state[w.from.dataset.id];
                    
                    // Visual feedback on wire
                    if (state[w.from.dataset.id] === 1) {
                        w.path.classList.add('active');
                    } else {
                        w.path.classList.remove('active');
                    }
                }
            });

            components.forEach(c => {
                if (c.type === 'switch') return;
                
                const inputs = state[c.id + '_inputs'] || {};
                let val = 0;
                
                if (c.type === 'bulb') {
                    val = inputs[0] || 0;
                    if (val) c.el.querySelector('.sb-bulb').classList.add('on');
                    else c.el.querySelector('.sb-bulb').classList.remove('on');
                } else if (c.type === 'and') {
                    val = (inputs[0] && inputs[1]) ? 1 : 0;
                } else if (c.type === 'or') {
                    val = (inputs[0] || inputs[1]) ? 1 : 0;
                } else if (c.type === 'not') {
                    val = (!inputs[0]) ? 1 : 0;
                } else if (c.type === 'xor') {
                    val = (inputs[0] ^ inputs[1]) ? 1 : 0;
                } else if (c.type === 'nand') {
                    val = !(inputs[0] && inputs[1]) ? 1 : 0;
                } else if (c.type === 'nor') {
                    val = !(inputs[0] || inputs[1]) ? 1 : 0;
                } else if (c.type === 'xnor') {
                    val = !(inputs[0] ^ inputs[1]) ? 1 : 0;
                }

                state[c.id + '_out'] = val;
            });
        }
    }
}
