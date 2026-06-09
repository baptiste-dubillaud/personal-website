import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

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
                    backgroundColor: "rgb(236, 226, 210)",
                }}
            >
                {/* Card — mirrors .presentation_container */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 40,
                        backgroundColor: "rgba(255, 68, 0, 0.05)",
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
                            backgroundColor: "rgba(255, 68, 0, 0.6)",
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
                                boxShadow: "0px 0px 10px rgba(255, 68, 0, 0.9)",
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
                                    color: "rgb(255, 68, 0)",
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
                                    color: "rgb(30, 30, 30)",
                                    lineHeight: 1.1,
                                }}
                            >
                                Dubillaud
                            </span>
                        </div>

                        {/* Role — mirrors .presentation_data_role_container */}
                        <div style={{ display: "flex", flexDirection: "row", gap: 6, marginTop: 12 }}>
                            <span style={{ fontSize: 30, color: "rgb(50, 50, 50)" }}>Freelance</span>
                            <span style={{ fontSize: 30, color: "rgb(255, 68, 0)" }}>Tech-Lead</span>
                            <span style={{ fontSize: 30, color: "rgb(50, 50, 50)" }}>&amp;</span>
                            <span style={{ fontSize: 30, color: "rgb(255, 68, 0)" }}>AI Software Engineer</span>
                        </div>

                        {/* URL + email */}
                        <div style={{ display: "flex", flexDirection: "row", gap: 12, marginTop: 18, alignItems: "center" }}>
                            <span style={{ fontSize: 22, color: "rgba(150, 130, 110, 1)" }}>dubillaudb.fr</span>
                            <span style={{ fontSize: 30, color: "rgba(150, 130, 110, 1)" }}>·</span>
                            <span style={{ fontSize: 22, color: "rgba(150, 130, 110, 1)" }}>contact@dubillaudb.fr</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 },
    );
}
