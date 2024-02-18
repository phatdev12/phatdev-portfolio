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
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
    smoothWheel: true,
    duration: 1.88,
})

lenis.on('scroll', (e: any) => {
    console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.registerPlugin(TextPlugin, ScrollTrigger);
ScrollTrigger.normalizeScroll(false);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

export function HomeComponent() {
    gsap.set('.follow',{xPercent:-50,yPercent:-50});
    gsap.set('.cursor',{xPercent:-50,yPercent:-50});
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
                autoAlpha: 1,
                y: 100,
                duration: 1,
                ease: 'expo'
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
        const follow = document.querySelector('.follow');
        const cur = document.querySelector('.cursor');
        window.addEventListener('mousemove',e => {
            const {target, x, y} = e;
            if (target instanceof HTMLElement) {
                const isTargetElement = window.targetElement.includes(target.tagName.toLowerCase());
                console.log(isTargetElement)
                gsap.to(cur,0.7,{
                    x, 
                    y,
                    ease: 'power4',
                    opacity: 1,
                    transform: `scale(${isTargetElement ? 5 : 1})`,
                });
                gsap.to(follow,0.9,{
                    x, 
                    y, 
                    opacity: isTargetElement ? 0 : 1
                });
            }
            
            
        }); 
        document.addEventListener('mouseleave', () => {
            gsap.to(cur, {
              duration: 0.7,
              opacity: 0,
            });
            gsap.to(follow, {
                duration: 0.7,
                opacity: 0,
            });
          });       
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
        clientEvent.on("Components", async function (element) {
            setContent(element);
        });
    }, [])
    return (
        <div style={cssObject.mainContainer} id="smooth-content">
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
            {content && <Markdown content={content} />}
        </div>

    )
}