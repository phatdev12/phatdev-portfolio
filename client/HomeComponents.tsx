'use client';
import { Engine } from '@phatdev/utils/engine';
import vertexShader from '@phatdev/shaders/vertex.glsl';
import fragmentShader from '@phatdev/shaders/fragment.glsl';
import { clientEvent } from '@phatdev/Event';
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useState } from 'react';
import { useActive } from '@phatdev/hooks';
import { useStyle } from '@phatdev/hooks/useStyle';
import { MainPage } from './MainPage';
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Markdown } from '@phatdev/Markdown';

gsap.registerPlugin(TextPlugin);
export function HomeComponent() {
    const [titleName, setTitleName] = useState('');
        const [metaLength, setMetaLength] = useState(0);
        const [content, setContent] = useState<MDXRemoteSerializeResult>();

        const cssObject = useStyle('root');

        var created = false;
        var time = 0.0;

        // style of title
        const styleTitle = function (titleName: string) {
            const windowWidth = window.innerWidth;
            if (titleName) {
                console.log('true');
                const animation = gsap.timeline()
                animation.fromTo('.title-animation1', {
                    autoAlpha: 1,
                    delay: 0.1,
                    y: 110,
                    opacity: 0,
                    duration: 1,
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'expo'
                }).fromTo('.title-animation2', {
                    autoAlpha: 2,
                    y: 100,
                    duration: 1,
                    ease: 'power3'
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 2.0,
                    ease: 'expo'
                }, '-=1')
                const title = document.querySelectorAll(`.${titleName}`) as NodeListOf<Element>;
                if (title) {
                    title.forEach((e: any) => e.style.fontSize = `${windowWidth * 1 / 9}px`)
                }
            }
        }

        useActive(() => {
            (function () {
                const scroll = new LocomotiveScroll({
                    el: document.querySelector(`[data-scroll-container]`) as HTMLElement,
                    smooth: true,
                });
            })();
        });

        useActive(async () => {
            if (typeof window !== "undefined") {
                clientEvent.on('domLoaded', async function () {
                    setMetaLength(Math.floor(window.innerWidth / 84.78));
                    let result = await window.system.jsonRequest(
                        window.location.hostname + (window.location.hostname == "localhost" && `:${window.location.port}`),
                        '/class.json',
                        window.location.protocol === "https:"
                    );

                    result = result.main + '_' + (await window.system.generate_random_string(20));
                    setTitleName(result);
                })
            }
        }, []);

        useEffect(() => {
            styleTitle(titleName);
        }, [titleName]);

        useEffect(() => {
            if (typeof window !== "undefined") {
                if (created === false) {
                    const obj = new Engine(document.body, 0, 0);
                    const geometry = Engine.createPlaneGeometry(1, 1, 100, 100);
                    const material = Engine.createShader(vertexShader, fragmentShader);

                    const cube = Engine.createMesh(geometry, material);
                    const light = Engine.createDirectionalLight(0xffffff, 0.5);

                    const callbackRenderer = () => {
                        time += 0.05;
                        material.uniforms.time.value = time;
                    };

                    obj.base.append(light, cube);
                    obj.base.render(callbackRenderer);

                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    created = true;
                }

            }
        }, [created, time]);

        useActive(async () => {
            clientEvent.on("Components", async function(element) {
                setContent(element);
            });
        }, [])
        return (
            <div style={cssObject.mainContainer}>
                <div style={{
                    padding: '5px',
                    display: 'flex',
                    gap: '10px',
                    background: '#000',
                    justifyContent: "center",
                    position: 'relative',
                    zIndex: '23',
                    borderBottom: '1px solid rgb(50, 50, 50)'
                }}>
                    {Array(metaLength).fill(<>
                        <span style={{
                            gap: '5px'
                        }}>CREATIVE</span>
                    </>)}
                </div>
                <MainPage titleName={titleName} />
                {content && <Markdown content={content}/>}
            </div>

        )
}