"use client";

import type React from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ChevronDown, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type JSX } from "react";

gsap.registerPlugin(ScrollTrigger);

const images = [
    "https://scontent-bom2-1.cdninstagram.com/v/t51.2885-15/557816504_17961354830993804_718259723340234079_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE2NDB4MTkzMi5zZHIuZjgyNzg3LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-bom2-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2QGo_7uRN5vEAhxIgz-UcMcT0mYRDw_v1jTFi2qNaHACuH-4cNFRAg5OaBw25aJ_jFY&_nc_ohc=Kn1WPNWNcYkQ7kNvwHt3F2e&_nc_gid=cNfTlmBUi7xMWIRph5U6fw&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzczNDI4ODM0NTI0Mjc1Njk3OQ%3D%3D.3-ccb7-5&oh=00_Afef173ErJUBx3B1yvdsYmyOSbjOLWzb0yNPsWPLH27fww&oe=68E589FF&_nc_sid=7a9f4b",
    "https://scontent-bom2-1.cdninstagram.com/v/t51.82787-15/540588285_17957552192993804_3806542416414827234_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=105&ig_cache_key=MzcxMjAzMzc0ODcwOTIyMjE3Mw%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=YI5sSgkRYwYQ7kNvwEBKCrs&_nc_oc=AdmV1w7ney-nnjvcLh_kXCii4JROkhpBbXmlinq_8j_U93UrGmtasFOpmq6Tb-0WQKk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-bom2-1.cdninstagram.com&_nc_gid=cNfTlmBUi7xMWIRph5U6fw&oh=00_AffMPXBVSBVjjVZvuh34TyxU59eUvP9Op2GCHlZ0g4sobw&oe=68E5A4AE",
    "https://scontent-bom2-1.cdninstagram.com/v/t51.2885-15/528028740_17954719124993804_2323485322428991947_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjExNDF4OTI1LnNkci5mODI3ODcuZGVmYXVsdF9pbWFnZS5jMiJ9&_nc_ht=scontent-bom2-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2QFF_cjRasjP88u9zoqHpz-Q9kR8n4e4lqGNAo-Q_VTng7_PLzDcJFjMQwz2OVRlJsI&_nc_ohc=hMOGD9Vur5QQ7kNvwHHgA6b&_nc_gid=m3BxuCIEjyv3leFL_sZ1Sg&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY5MzcwMTI4NjkwMzU2MTcwMw%3D%3D.3-ccb7-5&oh=00_AffVI7jeEtW1XET4KiS4svLZG8mw-2s7aeh-lpfiNxZupQ&oe=68E5AEF4&_nc_sid=22de04",
    // "https://scontent-bom2-1.cdninstagram.com/v/t51.2885-15/527461490_17954353262993804_7139077503506921143_n.jpg?stp=dst-jpg_e35_s1080x1080_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjE0NDB4MTAyMy5zZHIuZjgyNzg3LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-bom2-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2QFF_cjRasjP88u9zoqHpz-Q9kR8n4e4lqGNAo-Q_VTng7_PLzDcJFjMQwz2OVRlJsI&_nc_ohc=ZpgM06GW3dUQ7kNvwHqnLhT&_nc_gid=m3BxuCIEjyv3leFL_sZ1Sg&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY5MTIyMjYyMTA4NzQ5ODAxMA%3D%3D.3-ccb7-5&oh=00_AfeDoZ-o1NmzjR0yHnTfCUKDiJD69xIYA1307PTxw86ifg&oe=68E584BD&_nc_sid=22de04",
];

const roles = [
    "Fashion Journalists / Magazine",
    "Guest",
    "DJ",
    "Model",
    "KOL / Content Creator",
    "Designer",
    "Artist",
    "Photographer",
    "Filmmaker",
    "MUA",
    "Graphic Designer",
    "Creative Head",
    "Stylist",
    "Fashion Brand",
];

// const videoUrl = "https://media.kitse.in/Kitse3.mp4";

export default function UGRFRForm(): JSX.Element {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        social: "",
        phone: "",
        role: "",
        questions: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
    const formRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);
    const labelRefs = useRef<(HTMLLabelElement | null)[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        imgRefs.current.forEach((el, idx) => {
            if (!el) return;

            const speed = 0.3 + idx * 0.15;
            const scale = 1.15 + idx * 0.05;

            gsap.to(el, {
                y: () => -window.innerHeight * speed,
                scale: scale,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2,
                },
            });
        });

        if (formRef.current) {
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 80, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 1.5,
                    },
                }
            );
        }

        if (titleRef.current) {
            gsap.from(titleRef.current.children, {
                opacity: 0,
                y: 60,
                duration: 1.4,
                ease: "power4.out",
                stagger: 0.2,
                delay: 0.2,
            });
        }

        if (subtitleRef.current) {
            gsap.from(subtitleRef.current, {
                opacity: 0,
                y: 30,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.8,
            });
        }

        labelRefs.current.forEach((label, idx) => {
            if (!label) return;
            gsap.from(label, {
                opacity: 0,
                x: -20,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: label,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
                delay: idx * 0.05,
            });
        });

        inputRefs.current.forEach((input, idx) => {
            if (!input) return;
            gsap.from(input, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: input,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
                delay: idx * 0.05,
            });
        });

        if (buttonRef.current) {
            gsap.from(buttonRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: buttonRef.current,
                    start: "top 95%",
                    toggleActions: "play none none none",
                },
            });
        }
    }, []);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, {
            scale: 1.01,
            duration: 0.3,
            ease: "power2.out",
        });

        const label = e.target.previousElementSibling;
        if (label) {
            gsap.to(label, {
                y: -2,
                duration: 0.3,
                ease: "power2.out",
            });
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        gsap.to(e.target, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
        });

        const label = e.target.previousElementSibling;
        if (label) {
            gsap.to(label, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
            });
        }

        try {
            const response = await fetch("/api/connect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    social: "",
                    phone: "",
                    role: "",
                    questions: "",
                });

                if (formRef.current) {
                    gsap.to(formRef.current, {
                        scale: 1.02,
                        duration: 0.3,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.inOut",
                    });
                }
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="hidden md:block relative min-h-screen w-full overflow-hidden">
                <div className="relative z-10 flex justify-center gap-5 min-h-screen py-6 px-6 ">
                    <div className="hidden md:flex flex-2/3 w-full h-full overflow-hidden">
                        <StackedSlider />
                    </div>
                    <div className="flex-1/3 flex flex-col gap-5">
                        <div
                            ref={formRef}
                            className="flex-1/3 w-full max-h-max bg-white/40 backdrop-blur-2xl border border-black/5 rounded-2xl p-8 md:p-12 shadow-xl"
                        >
                            <div className="mb-12 text-start space-y-4">
                                <h1
                                    ref={titleRef}
                                    className="text-black text-6xl md:text-7xl font-light tracking-tight"
                                >
                                    <span className="block font-medium tracking-tighter">UGRFR x SAIGON</span>
                                    <span className="block text-xl md:text-2xl mt-4 opacity-60">
                                        Underground Runway Fashion Rave
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <X className="opacity-60" />
                                        <span className="block text-xl md:text-2xl opacity-60">
                                            Step into the Underground
                                        </span>
                                    </div>
                                </h1>

                                <p className="flex flex-col">
                                    <span>A collision of fashion, rave, and raw creativity.</span>
                                    <span>Join the movement that&apos;s rewriting the runway.</span>
                                </p>

                                <p ref={subtitleRef} className="text-black/60 text-sm">
                                    Saturday, 11 October 2025 · Saigon
                                    <br />
                                    <span className="font-medium text-black">50 Spots · Deadline: 5 Oct</span>
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1.5">
                                    <label
                                        ref={el => {
                                            labelRefs.current[0] = el;
                                        }}
                                        className="block text-black/80 text-xs font-medium tracking-wide uppercase"
                                    >
                                        Name *
                                    </label>
                                    <input
                                        ref={el => {
                                            inputRefs.current[0] = el;
                                        }}
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        className="w-full bg-white/50 border-b-2 border-black/10 px-0 py-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-all duration-500"
                                        placeholder="Full name"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label
                                        ref={el => {
                                            labelRefs.current[1] = el;
                                        }}
                                        className="block text-black/80 text-xs font-medium tracking-wide uppercase"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        ref={el => {
                                            inputRefs.current[1] = el;
                                        }}
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        className="w-full bg-white/50 border-b-2 border-black/10 px-0 py-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-all duration-500"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label
                                        ref={el => {
                                            labelRefs.current[2] = el;
                                        }}
                                        className="block text-black/80 text-xs font-medium tracking-wide uppercase"
                                    >
                                        Social *
                                    </label>
                                    <input
                                        ref={el => {
                                            inputRefs.current[2] = el;
                                        }}
                                        type="text"
                                        name="social"
                                        required
                                        value={formData.social}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        className="w-full bg-white/50 border-b-2 border-black/10 px-0 py-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-all duration-500"
                                        placeholder="@username"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label
                                        ref={el => {
                                            labelRefs.current[3] = el;
                                        }}
                                        className="block text-black/80 text-xs font-medium tracking-wide uppercase"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        ref={el => {
                                            inputRefs.current[3] = el;
                                        }}
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        className="w-full bg-white/50 border-b-2 border-black/10 px-0 py-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-all duration-500"
                                        placeholder="Optional"
                                    />
                                </div>

                                <RoleSelect
                                    value={formData.role}
                                    onChange={role => setFormData({ ...formData, role })}
                                    labelRef={el => (labelRefs.current[4] = el)}
                                />

                                <div className="space-y-1.5">
                                    <label
                                        ref={el => {
                                            labelRefs.current[7] = el;
                                        }}
                                        className="block text-black/80 text-xs font-medium tracking-wide uppercase"
                                    >
                                        Questions
                                    </label>
                                    <textarea
                                        ref={el => {
                                            inputRefs.current[7] = el;
                                        }}
                                        name="questions"
                                        value={formData.questions}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        rows={2}
                                        className="w-full bg-white/50 border-b-2 border-black/10 px-0 py-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-all duration-500 resize-none"
                                        placeholder="Any questions?"
                                    />
                                </div>

                                <button
                                    ref={buttonRef}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-black text-white py-4 rounded-full font-light text-sm tracking-widest uppercase hover:bg-black/90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>

                                {submitStatus === "success" && (
                                    <div className="text-center text-black/60 text-sm animate-fade-in">
                                        Registration submitted. Check your email.
                                    </div>
                                )}
                                {submitStatus === "error" && (
                                    <div className="text-center text-red-500/60 text-sm animate-fade-in">
                                        Error. Please try again.
                                    </div>
                                )}
                            </form>
                        </div>
                        {/*  */}
                    </div>
                </div>
            </div>

            {/* Mobile Ui  */}
            <UGRFRFormMobile
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
            />
        </>
    );
}

function RoleSelect({
    value,
    onChange,
    labelRef,
}: {
    value: string;
    onChange: (role: string) => void;
    labelRef?: (el: HTMLLabelElement | null) => void;
}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Animate dropdown when opening
        if (open && dropdownRef.current) {
            gsap.from(dropdownRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                ease: "power2.out",
            });
        }

        // Function to detect outside clicks
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleWheel = (e: React.WheelEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="space-y-1.5">
            <label ref={labelRef} className="block text-black/80 text-xs font-medium tracking-wide uppercase">
                Role *
            </label>
            <div className="relative">
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="w-full flex justify-between items-center bg-white/30 pl-2 border-b-2 border-black/10 px-0 py-3 text-black text-left focus:outline-none focus:border-black/40 transition-all duration-500"
                >
                    <span className={value ? "text-black" : "text-black/30"}>{value || "Select role"}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
                </button>

                {open && (
                    <div
                        ref={dropdownRef}
                        onWheel={handleWheel}
                        className="absolute mt-2 w-full max-h-60 overflow-y-auto bg-white/95 backdrop-blur-xl border border-black/10 rounded-xl shadow-2xl z-50 scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent"
                    >
                        {roles.map((role, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                    onChange(role);
                                    setOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-3 text-sm text-black hover:bg-black/5 transition-colors duration-300 ${
                                    value === role ? "bg-black/5 font-medium" : ""
                                }`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function StackedSlider(): JSX.Element {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            // repeat: -1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top+=24px",
                end: "+=300", // scroll distance (tweak as needed)
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                scrub: true,
            },
        }); // infinite loop

        images.forEach((_, i) => {
            if (i === 0) return; // skip the first (already visible)

            tl.fromTo(
                imageRefs.current[i],
                { x: "100%" }, // start outside right
                {
                    x: "0%",
                    duration: 1.2,
                    ease: "power3.inOut",
                },
                `+=2` // wait 2s before each slide
            );
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[95svh] rounded-2xl overflow-hidden bg-black">
            {images.map((src, idx) => (
                <div
                    key={idx}
                    ref={el => {
                        if (el) imageRefs.current[idx] = el;
                    }}
                    className="absolute inset-0"
                    style={{ zIndex: idx }}
                >
                    <Image src={src || "/placeholder.svg"} alt={`slide-${idx}`} fill className="object-cover" />
                </div>
            ))}
        </div>
    );
}

const totalImages = 22; // 0 to 21
const imageUrls: string[] = Array.from({ length: totalImages }, (_, i) => {
    const padded = i.toString().padStart(2, "0");
    return `https://media.capsulecorporations.com/${padded}.jpeg`;
});

interface FormData {
    name: string;
    email: string;
    social: string;
    phone: string;
    role: string;
    questions: string;
}

interface UGRFRFormProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
    submitStatus: "idle" | "success" | "error";
}

function UGRFRFormMobile({
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    isSubmitting,
    submitStatus,
}: UGRFRFormProps) {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [currentCard, setCurrentCard] = useState(0);
    const initialized = useRef(false);

    const applyStack = useCallback((index: number, animate = false) => {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

        cards.forEach((el, i) => {
            if (!el) return;
            const pos = i - index;

            if (pos < 0 || pos > 2) {
                // hide cards outside the visible stack range without fading
                gsap.set(el, { display: "none", pointerEvents: "none" });
                return;
            }

            const target = {
                display: "block" as const,
                rotate: pos * 10,
                scale: 1 - pos * 0.04,
                zIndex: 10 - pos,
                pointerEvents: pos === 0 ? "auto" : "none",
                y: pos * 8,
                // keep top-card glow for rave vibe
                filter: pos === 0 ? "drop-shadow(0 0 14px rgba(34,211,238,0.45))" : "none",
            };

            if (animate) {
                gsap.to(el, { ...target, duration: 0.4, ease: "power2.out" });
            } else {
                gsap.set(el, target);
            }
        });
    }, []);

    useLayoutEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.set(cards, {
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
        });

        applyStack(0, false);
    }, [applyStack]);

    const goToCard = (index: number) => {
        if (index < 0 || index > 2 || index === currentCard) return;

        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        const current = cards[currentCard];
        const next = cards[index];
        if (!current || !next) return;

        // direction: next = 1, previous = -1
        const dir = index > currentCard ? 1 : -1;

        const tl = gsap.timeline({
            onStart: () => {
                gsap.set(next, { display: "block" });
            },
            onComplete: () => {
                setCurrentCard(index);
            },
        });

        // rotate current card out + slide only for next
        tl.to(
            current,
            {
                rotate: 20 * dir,
                x: dir === 1 ? -100 : 0, // slide only for next, reset x for prev
                duration: 0.35,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(current, { display: "none", rotate: 0, x: 0 });
                },
            },
            0
        );

        // restack remaining cards
        tl.add(() => applyStack(index, true), 0.12);
    };

    return (
        <div className="block md:hidden relative min-h-screen max-h-[100svh] w-full overflow-hidden bg-background font-poppins tracking-tighter">
            <BackgroundCycler />
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen">
                <div className="absolute inset-0 animate-rave-scan bg-[repeating-linear-gradient(180deg,rgba(34,211,238,0.15)_0px,rgba(34,211,238,0.15)_2px,transparent_2px,transparent_6px)]" />
            </div>

            <div className="relative z-10 flex justify-center items-center min-h-screen px-6">
                <div className="w-full max-w-md relative flex justify-center items-center">
                    {[0, 1, 2].map(i => (
                        <div
                            key={i}
                            ref={el => {
                                cardRefs.current[i] = el;
                            }}
                            className={`rave-card absolute w-80 bg-card/50 backdrop-blur-2xl border border-accent/20 rounded-2xl p-8 shadow-xl ring-1 ring-[oklch(var(--color-chart-2))]/30 ${
                                i === currentCard ? "pointer-events-auto" : "pointer-events-none"
                            }`}
                        >
                            {/* --- Card 1: Info --- */}
                            {i === 0 && (
                                <div className="space-y-6">
                                    <div className="card-title">
                                        <h1 className="text-foreground text-3xl font-light tracking-tight">
                                            <span className="block font-medium tracking-tighter">UGRFR x SAIGON</span>
                                            <span className="block text-base mt-3 opacity-70">
                                                Underground Runway Fashion Rave
                                            </span>
                                            <div className="flex items-center gap-2 mt-2 opacity-70">
                                                <X className="scale-75" />
                                                <span className="text-base">Step into the Underground</span>
                                            </div>
                                        </h1>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-foreground/80 text-xs font-medium uppercase">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-white/30 pl-2 border-b-2 border-border py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/60 transition-all duration-500"
                                            placeholder="Full name"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-foreground/80 text-xs font-medium uppercase">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/30 pl-2  border-b-2 border-border py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/60 transition-all duration-500"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* --- Card 2: Basic Info --- */}
                            {i === 1 && (
                                <form className="space-y-5">
                                    <p className="text-foreground/80 text-sm leading-relaxed">
                                        A collision of fashion, rave, and raw creativity.
                                        <br />
                                        Join the movement that’s rewriting the runway.
                                    </p>
                                    <p className="text-foreground/70 text-xs">Saturday, 11 October 2025 · Saigon</p>

                                    <div className="space-y-1">
                                        <label className="block text-foreground/80 text-xs font-medium uppercase">
                                            Social *
                                        </label>
                                        <input
                                            type="text"
                                            name="social"
                                            required
                                            value={formData.social}
                                            onChange={handleChange}
                                            className="w-full bg-white/30 pl-2 0 border-b-2 border-border py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/60 transition-all duration-500"
                                            placeholder="@username"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-foreground/80 text-xs font-medium uppercase">
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-white/30 pl-2  border-b-2 border-border py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/60 transition-all duration-500"
                                            placeholder="Optional"
                                        />
                                    </div>
                                </form>
                            )}

                            {/* --- Card 3: Role + Questions --- */}
                            {i === 2 && (
                                <form className="space-y-5">
                                    <div className="card-title mb-1">
                                        <h2 className="text-foreground/80 text-sm tracking-widest uppercase">
                                            Finalize
                                        </h2>
                                    </div>

                                    <RoleSelect
                                        value={formData.role}
                                        onChange={(role: string) => setFormData({ ...formData, role })}
                                    />

                                    <div className="space-y-1">
                                        <label className="block text-foreground/80 text-xs font-medium uppercase">
                                            Questions
                                        </label>
                                        <textarea
                                            name="questions"
                                            value={formData.questions}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full bg-white/30 pl-2  border-b-2 border-border py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/60 transition-all duration-500 resize-none"
                                            placeholder="Any questions?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary text-primary-foreground py-4 rounded-full font-light text-sm tracking-widest uppercase hover:opacity-90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit"}
                                    </button>

                                    {submitStatus === "success" && (
                                        <div className="text-center text-foreground/70 text-sm animate-fade-in">
                                            Registration submitted. Check your email.
                                        </div>
                                    )}
                                    {submitStatus === "error" && (
                                        <div className="text-center text-destructive/80 text-sm animate-fade-in">
                                            Error. Please try again.
                                        </div>
                                    )}
                                </form>
                            )}
                            {/* --- Card 3: Role + Questions --- */}
                            {i === 3 && (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="card-title mb-1">
                                        <h2 className="text-foreground/80 text-sm tracking-widest uppercase">
                                            Finalize
                                        </h2>
                                    </div>

                                    <RoleSelect
                                        value={formData.role}
                                        onChange={(role: string) => setFormData({ ...formData, role })}
                                    />

                                    <div className="space-y-1">
                                        <label className="block text-foreground/80 text-xs font-medium uppercase">
                                            Questions
                                        </label>
                                        <textarea
                                            name="questions"
                                            value={formData.questions}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full bg-white/30 pl-2  border-b-2 border-border py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/60 transition-all duration-500 resize-none"
                                            placeholder="Any questions?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-primary text-primary-foreground py-4 rounded-full font-light text-sm tracking-widest uppercase hover:opacity-90 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit"}
                                    </button>

                                    {submitStatus === "success" && (
                                        <div className="text-center text-foreground/70 text-sm animate-fade-in">
                                            Registration submitted. Check your email.
                                        </div>
                                    )}
                                    {submitStatus === "error" && (
                                        <div className="text-center text-destructive/80 text-sm animate-fade-in">
                                            Error. Please try again.
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Arrows Navigation */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-between items-center p-10 z-10">
                <button
                    onClick={() => goToCard(currentCard - 1)}
                    disabled={currentCard === 0}
                    className="p-3 bg-[#D8E7EA] backdrop-blur-md rounded-full border border-border disabled:opacity-0 transition-all duration-500"
                >
                    <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                    onClick={() => goToCard(currentCard + 1)}
                    disabled={currentCard === 2}
                    className="p-3 bg-[#D8E7EA] flex justify-center items-center gap-2 backdrop-blur-md rounded-full border border-border disabled:opacity-0 transition-all duration-500"
                >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4 text-foreground" />
                </button>
            </div>

            <style jsx>{`
                @keyframes rave-scan {
                    0% {
                        transform: translateY(-10%);
                        opacity: 0.12;
                    }
                    50% {
                        opacity: 0.22;
                    }
                    100% {
                        transform: translateY(10%);
                        opacity: 0.12;
                    }
                }
                .animate-rave-scan {
                    animation: rave-scan 3s ease-in-out infinite alternate;
                }
                .rave-card {
                    transition: box-shadow 300ms ease;
                }
                .rave-card:hover {
                    box-shadow: 0 0 0 0 rgba(34, 211, 238, 0), 0 0 28px -8px rgba(34, 211, 238, 0.55);
                }
            `}</style>
        </div>
    );
}

const BackgroundCycler = () => {
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<HTMLImageElement[]>([]);

    // Preload images (optional if you rely on next/image lazyLoad)
    useEffect(() => {
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;

        imageUrls.forEach(url => {
            const img = new window.Image();
            img.src = url;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === imageUrls.length) setLoaded(true);
            };
            images.push(img);
        });

        return () => {
            images.length = 0;
        };
    }, []);

    // GSAP fade cycle
    useGSAP(() => {
        if (!loaded || !containerRef.current) return;

        const imgs = imageRefs.current;
        if (!imgs.length) return;

        // Initial states
        gsap.set(imgs, { opacity: 0 });
        gsap.set(imgs[0], { opacity: 1 });

        // Infinite crossfade loop
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
        imgs.forEach((img, i) => {
            const next = imgs[(i + 1) % imgs.length];
            tl.to(img, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "+=2");
            tl.to(next, { opacity: 1, duration: 0.6, ease: "power2.inOut" }, "<");
        });

        return () => tl.kill();
    }, [loaded]);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
            {imageUrls.map((src, i) => (
                <Image
                    key={i}
                    ref={el => {
                        if (el) imageRefs.current[i] = el;
                    }}
                    src={src}
                    alt={`bg-${i}`}
                    fill
                    priority={i === 0}
                    className="object-cover absolute inset-0 transition-opacity duration-1000"
                />
            ))}
        </div>
    );
};
