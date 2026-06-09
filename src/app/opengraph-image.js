import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { COLORS } from "@/utils/colorUtils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
    const profileImg = readFileSync(join(process.cwd(), "public/images/profile.png"));
    const profileSrc = `data:image/png;base64,${profileImg.toString("base64")}`;

    return new ImageResponse(
        (
            // Page background
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.background,
                }}
            >
                {/* Card — mirrors .presentation_container */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 40,
                        backgroundColor: COLORS.orangeOpacity05,
                        borderRadius: 20,
                        padding: 50,
                    }}
                >
                    {/* Profile picture — mirrors .presentation_picture_border_container */}
                    <div
                        style={{
                            width: 220,
                            height: 220,
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
                            width={214}
                            height={214}
                            style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                                objectPosition: "center 5%",
                                boxShadow: `0px 0px 10px ${COLORS.orangeOpacity9}`,
                            }}
                        />
                    </div>

                    {/* Text data */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {/* Name — mirrors .presentation_data_name_container */}
                        <div style={{ display: "flex", flexDirection: "row", gap: 14, alignItems: "baseline" }}>
                            <span
                                style={{
                                    fontSize: 72,
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: "-1.5px",
                                    color: COLORS.orange,
                                    lineHeight: 1.1,
                                }}
                            >
                                Baptiste
                            </span>
                            <span
                                style={{
                                    fontSize: 72,
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: "-1.5px",
                                    color: COLORS.text,
                                    lineHeight: 1.1,
                                }}
                            >
                                Dubillaud
                            </span>
                        </div>

                        {/* Role — mirrors .presentation_data_role_container */}
                        <div style={{ display: "flex", flexDirection: "row", gap: 6, marginTop: 12 }}>
                            <span style={{ fontSize: 30, color: COLORS.textSecondary }}>Freelance</span>
                            <span style={{ fontSize: 30, color: COLORS.orange }}>Tech-Lead</span>
                            <span style={{ fontSize: 30, color: COLORS.textSecondary }}>&amp;</span>
                            <span style={{ fontSize: 30, color: COLORS.orange }}>AI Software Engineer</span>
                        </div>

                        {/* URL + email */}
                        <div style={{ display: "flex", flexDirection: "row", gap: 12, marginTop: 18, alignItems: "center" }}>
                            <span style={{ fontSize: 22, color: COLORS.textWarmMuted }}>dubillaudb.fr</span>
                            <span style={{ fontSize: 30, color: COLORS.textWarmMuted }}>·</span>
                            <span style={{ fontSize: 22, color: COLORS.textWarmMuted }}>contact@dubillaudb.fr</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 },
    );
}
