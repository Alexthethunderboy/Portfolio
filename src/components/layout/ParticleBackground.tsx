'use client';

import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";

const ParticleBackground = () => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the slim version of tsparticles, which is usually enough for most use cases
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log("Particles loaded", container);
    };

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={{
                fullScreen: { enable: true, zIndex: 20 },
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                        },
                        onHover: {
                            enable: true,
                            mode: "grab",
                        },
                        resize: {
                            enable: true,
                        },
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            links: {
                                opacity: 0.3,
                            },
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#A3A3A3",
                    },
                    links: {
                        color: "#A3A3A3",
                        distance: 200,
                        enable: true,
                        opacity: 0.05,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: true,
                        speed: 0.5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.2 },
                    },
                    shape: {
                        type: "square",
                    },
                    size: {
                        value: { min: 0.5, max: 1.5 },
                    },
                },
                detectRetina: true,
            }}
            className="fixed inset-0 w-full h-full pointer-events-none"
        />
    );
};

export default ParticleBackground;
