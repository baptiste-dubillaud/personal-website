import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { COLORS } from "@/utils/colorUtils";
import { CONTACT_EMAIL, SITE_DOMAIN } from "@/utils/linkUtils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The site's blueprint canvas (--blueprint-* in globals.css), adapted twice over
// for this medium:
//   - the lines run stronger than the site's 5%/9%, because a social feed shows
//     this 1200x630 image at roughly 500px wide and a 5% grid vanishes there;
//   - Satori supports no mask-image, so the radial spotlight is inverted into a
//     beige overlay — clear in the middle, opaque toward the edges. Keep it
//     gentle: the card covers most of the canvas, so anything stronger erases
//     the grid in the only margin where it can still be seen.
const BLUEPRINT_LINE = "rgba(177, 48, 1, 0.10)";
const BLUEPRINT_LINE_STRONG = "rgba(177, 48, 1, 0.17)";
const BLUEPRINT_SIZE = 32;
const FADE = "236, 226, 210";

const absolute = { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 };

export default function OGImage() {
    const profileImg = readFileSync(join(process.cwd(), "public/images/profile.png"));
    const profileSrc = `data:image/png;base64,${profileImg.toString("base64")}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 60,
                    backgroundColor: COLORS.background,
                }}
            >
                {/* Engineering-paper grid */}
                <div
                    style={{
                        ...absolute,
                        display: "flex",
                        backgroundImage: `linear-gradient(${BLUEPRINT_LINE} 1px, transparent 1px), linear-gradient(90deg, ${BLUEPRINT_LINE} 1px, transparent 1px)`,
                        backgroundSize: `${BLUEPRINT_SIZE}px ${BLUEPRINT_SIZE}px`,
                    }}
                />

                {/* Drafting marks: arc + concentric ring off the bottom-left corner */}
                <div
                    style={{
                        position: "absolute",
                        width: 620,
                        height: 620,
                        left: -210,
                        bottom: -260,
                        borderRadius: "50%",
                        border: `1px solid ${BLUEPRINT_LINE_STRONG}`,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        width: 370,
                        height: 370,
                        left: -95,
                        bottom: -145,
                        borderRadius: "50%",
                        border: `1px solid ${BLUEPRINT_LINE_STRONG}`,
                    }}
                />
                {/* Node ring, mid-right */}
                <div
                    style={{
                        position: "absolute",
                        width: 150,
                        height: 150,
                        right: 130,
                        top: 300,
                        borderRadius: "50%",
                        border: `1px solid ${BLUEPRINT_LINE_STRONG}`,
                    }}
                />
                {/* Crosshair, top-right */}
                <div style={{ position: "absolute", top: 92, right: 118, width: 50, height: 1, backgroundColor: BLUEPRINT_LINE_STRONG }} />
                <div style={{ position: "absolute", top: 68, right: 142, width: 1, height: 50, backgroundColor: BLUEPRINT_LINE_STRONG }} />

                {/* Spotlight: keeps the grid dense in the centre, fades it to bare beige at the edges */}
                <div
                    style={{
                        ...absolute,
                        display: "flex",
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(${FADE}, 0) 58%, rgba(${FADE}, 0.75) 100%)`,
                    }}
                />

                {/* Card — translucent, so the blueprint reads through it as on the site */}
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        gap: 48,
                        padding: "0 56px",
                        backgroundColor: COLORS.orangeOpacity05,
                        border: `1px solid rgba(255, 68, 0, 0.12)`,
                        borderRadius: 28,
                    }}
                >
                    {/* Profile picture */}
                    <div
                        style={{
                            width: 280,
                            height: 280,
                            borderRadius: "50%",
                            backgroundColor: COLORS.orangeOpacity6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <img
                            src={profileSrc}
                            width={272}
                            height={272}
                            style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                                objectPosition: "center 5%",
                                boxShadow: `0px 0px 14px ${COLORS.orangeOpacity9}`,
                            }}
                        />
                    </div>

                    {/* Text data */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {/* Stacked, so the name can own the card instead of being
                            squeezed onto one line beside the picture. */}
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: 104, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-3px", color: COLORS.orange, lineHeight: 1.05 }}>
                                Baptiste
                            </span>
                            <span style={{ fontSize: 104, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-3px", color: COLORS.text, lineHeight: 1.05 }}>
                                Dubillaud
                            </span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "row", gap: 8, marginTop: 16 }}>
                            <span style={{ fontSize: 30, color: COLORS.textSecondary }}>Freelance</span>
                            <span style={{ fontSize: 30, color: COLORS.orange }}>Tech-Lead</span>
                            <span style={{ fontSize: 30, color: COLORS.textSecondary }}>&amp;</span>
                            <span style={{ fontSize: 30, color: COLORS.orange }}>AI Software Engineer</span>
                        </div>

                        <div style={{ display: "flex", width: 120, height: 2, backgroundColor: COLORS.orangeOpacity4, marginTop: 30 }} />

                        <div style={{ display: "flex", flexDirection: "row", gap: 14, marginTop: 26, alignItems: "center" }}>
                            <span style={{ fontSize: 24, color: COLORS.textWarmMuted }}>{SITE_DOMAIN}</span>
                            <span style={{ fontSize: 30, color: COLORS.textWarmMuted }}>·</span>
                            <span style={{ fontSize: 24, color: COLORS.textWarmMuted }}>{CONTACT_EMAIL}</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 },
    );
}
