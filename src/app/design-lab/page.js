"use client";

import styles from "@/app/design-lab/page.module.css";

import { motion } from "framer-motion";

import { staggerContainer, fadeInUp } from "@/utils/animations";

import Button from "@/components/common/ui/Button/Button";
import Tag from "@/components/common/ui/Tag/Tag";
import Surface from "@/components/common/ui/Surface/Surface";
import PageHeader from "@/components/common/ui/PageHeader/PageHeader";
import NavigationButton from "@/components/common/ui/NavigationButton/NavigationButton";
import RichText from "@/components/common/ui/RichText";
import LanguageSwitcher from "@/components/common/ui/LanguageSwitcher/LanguageSwitcher";
import MonoLabel from "@/components/common/ui/MonoLabel/MonoLabel";
import Badge from "@/components/common/ui/Badge/Badge";
import Divider from "@/components/common/ui/Divider/Divider";
import PageBackground from "@/components/common/ui/PageBackground/PageBackground";
import Prompt from "@/components/common/ui/Prompt/Prompt";

import GithubIcon from "@/components/common/icons/apps/GithubIcon";
import LinkedInIcon from "@/components/common/icons/apps/LinkedInIcon";

const Section = ({ num, title, note, children }) => (
    <motion.section
        className={styles.section}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
    >
        <div className={styles.section_head}>
            <MonoLabel num={num}>{title}</MonoLabel>
            <span className={styles.section_rule} />
        </div>
        {note && <p className={styles.section_note}>{note}</p>}
        {children}
    </motion.section>
);

// Small caption flagging a primitive still to build.
const CompNote = ({ children }) => (
    <p className={styles.comp_note}>
        <span className={styles.badge_status_new}>à créer</span>
        <span className={styles.comp_path}>{children}</span>
    </p>
);

/* ── Token data ──────────────────────────────────────────────────────────── */

const RAMP = [
    ["orange-bright", "--color-orange-bright"],
    ["orange", "--color-orange"],
    ["orange-dark", "--color-orange-dark"],
    ["orange-deep", "--color-orange-deep"],
];

const SURFACE_COLORS = [
    ["background", "--color-background", true],
    ["white", "--color-white", true],
    ["dark", "--color-dark"],
    ["success", "--color-success"],
];

const TEXT_COLORS = [
    ["text", "--color-text"],
    ["text-secondary", "--color-text-secondary"],
    ["text-muted", "--color-text-muted"],
    ["text-light", "--color-text-light"],
    ["text-warm", "--color-text-warm"],
];

const TYPE = [
    ["text-hero", "--text-hero"],
    ["text-display", "--text-display"],
    ["text-44", "--text-44"],
    ["text-32", "--text-32"],
    ["text-24", "--text-24"],
    ["text-20", "--text-20"],
    ["text-16", "--text-16"],
    ["text-14", "--text-14"],
    ["text-12", "--text-12"],
];

const SPACES = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
const RADII = ["xs", "sm", "md", "lg"];

const SHADOWS = [
    ["elevation", "--shadow-elevation"],
    ["glow-orange", "--shadow-glow-orange"],
    ["glow-orange-lg", "--shadow-glow-orange-lg"],
    ["sm", "--shadow-sm"],
    ["md", "--shadow-md"],
];

export default function DesignSystem() {
    return (
        <PageBackground as="main" className={styles.lab_page}>
            <motion.div
                className={styles.inner}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* ── Header ───────────────────────────────────────────── */}
                <motion.header className={styles.hero} variants={fadeInUp}>
                    <MonoLabel num="v1">DESIGN SYSTEM</MonoLabel>
                    <h1 className={styles.hero_title}>
                        Design <span className={styles.hero_accent}>System</span>
                    </h1>
                    <p className={styles.hero_sub}>
                        Référence unique des tokens et composants du site — orange/beige,
                        direction <b>glow + blueprint</b>, animations subtiles.
                    </p>
                    <Prompt sign="$">design-system --reference</Prompt>
                </motion.header>

                {/* ══ FOUNDATIONS ══════════════════════════════════════ */}

                <Section num="01" title="COULEURS">
                    <span className={styles.group_label}>Ramp orange</span>
                    <div className={styles.swatch_grid}>
                        {RAMP.map(([name, v]) => (
                            <Swatch key={name} name={name} v={v} />
                        ))}
                    </div>
                    <span className={styles.group_label}>Surfaces &amp; feedback</span>
                    <div className={styles.swatch_grid}>
                        {SURFACE_COLORS.map(([name, v, light]) => (
                            <Swatch key={name} name={name} v={v} light={light} />
                        ))}
                    </div>
                    <span className={styles.group_label}>Texte</span>
                    <div className={styles.swatch_grid}>
                        {TEXT_COLORS.map(([name, v]) => (
                            <Swatch key={name} name={name} v={v} />
                        ))}
                    </div>
                </Section>

                <Section num="02" title="TYPOGRAPHIE" note="Corps en Inter · labels & métadonnées en IBM Plex Mono.">
                    <div className={styles.type_list}>
                        {TYPE.map(([name, v]) => (
                            <div key={name} className={styles.type_row}>
                                <span className={styles.type_sample} style={{ fontSize: `var(${v})` }}>
                                    Grumpy wizards
                                </span>
                                <span className={styles.type_meta}>{name}</span>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section num="03" title="ESPACEMENTS" note="Rythme 5px : --space-3xs (2px) → --space-3xl (50px).">
                    <div className={styles.space_list}>
                        {SPACES.map((s) => (
                            <div key={s} className={styles.space_row}>
                                <span className={styles.space_bar} style={{ width: `var(--space-${s})` }} />
                                <span className={styles.type_meta}>space-{s}</span>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section num="04" title="RAYONS">
                    <div className={styles.radius_grid}>
                        {RADII.map((r) => (
                            <div key={r} className={styles.radius_item}>
                                <span className={styles.radius_box} style={{ borderRadius: `var(--radius-${r})` }} />
                                <span className={styles.type_meta}>radius-{r}</span>
                            </div>
                        ))}
                        <div className={styles.radius_item}>
                            <span className={`${styles.radius_box} ${styles.radius_pill}`} />
                            <span className={styles.type_meta}>radius-pill</span>
                        </div>
                        <div className={styles.radius_item}>
                            <span className={`${styles.radius_box} ${styles.radius_full}`} />
                            <span className={styles.type_meta}>radius-full</span>
                        </div>
                    </div>
                </Section>

                <Section num="05" title="OMBRES & GLOW">
                    <div className={styles.shadow_grid}>
                        {SHADOWS.map(([name, v]) => (
                            <div key={name} className={styles.shadow_item}>
                                <span className={styles.shadow_tile} style={{ boxShadow: `var(${v})` }} />
                                <span className={styles.type_meta}>{name}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.gradient_bar}>
                        <span className={styles.gradient_label}>gradient-orange</span>
                    </div>
                </Section>

                <Section
                    num="06"
                    title="GRILLE BLUEPRINT"
                    note="Grille d'ingénierie masquée en spotlight centré — le fond de cette page. À poser en fond de toutes les pages."
                >
                    <div className={styles.blueprint_demo}>
                        <MonoLabel num="bg">--blueprint-line · --blueprint-size</MonoLabel>
                    </div>
                </Section>

                {/* ══ COMPONENTS ═══════════════════════════════════════ */}

                <Section num="07" title="BOUTONS">
                    <div className={styles.btn_row}>
                        <Button variant="glow">Glow CTA</Button>
                        <Button variant="solid">Solid</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">ghost link</Button>
                    </div>
                    <div className={styles.btn_row}>
                        <Button variant="glow" size="sm">Glow</Button>
                        <Button variant="solid" size="sm">Solid</Button>
                        <Button variant="outline" size="sm">Outline</Button>
                    </div>
                </Section>

                <Section num="08" title="SURFACES">
                    <div className={styles.cards_row}>
                        <Surface variant="plain" interactive className={styles.demo_surface}>
                            <MonoLabel num="A">PLAIN</MonoLabel>
                            <p className={styles.surface_text}>Panneau orange interactif (lift au survol).</p>
                        </Surface>

                        <Surface variant="glow" className={styles.demo_surface}>
                            <MonoLabel num="B">GLOW</MonoLabel>
                            <p className={styles.surface_text}>Halo orange qui s&apos;intensifie au survol.</p>
                        </Surface>

                        <Surface variant="glow" corners className={styles.demo_surface}>
                            <MonoLabel num="C">GLOW + CORNERS</MonoLabel>
                            <p className={styles.surface_text}>Glow + coins ticks, pour les cartes clés.</p>
                        </Surface>
                    </div>
                </Section>

                <Section num="09" title="TAGS & BADGES">
                    <div className={styles.chips_row}>
                        <Tag>React</Tag>
                        <Tag>Next.js</Tag>
                        <Tag>Python</Tag>
                        <Tag>PostgreSQL</Tag>
                    </div>
                    <div className={styles.chips_row}>
                        <Badge tone="orange" dot dotTone="success" pulse>Disponible</Badge>
                        <Badge tone="muted" dot>Actif</Badge>
                        <Badge tone="orange">Nouveau</Badge>
                    </div>
                </Section>

                <Section num="10" title="MONO & SÉPARATEURS">
                    <div className={styles.mono_lines}>
                        <MonoLabel num="01">EXPERIENCE</MonoLabel>
                        <MonoLabel num="fr">LOCATION</MonoLabel>
                        <Divider />
                        <Prompt sign=">">whoami</Prompt>
                    </div>
                </Section>

                <Section num="11" title="EN-TÊTE DE PAGE & LIENS">
                    <div className={styles.demo_block}>
                        <PageHeader title="Titre de page" subtitle="Sous-titre optionnel centré, réutilisé sur les pages index." />
                    </div>
                    <div className={styles.icon_links}>
                        <NavigationButton link="https://github.com" alt="Github">
                            <GithubIcon size={30} />
                        </NavigationButton>
                        <NavigationButton link="https://linkedin.com" alt="LinkedIn">
                            <LinkedInIcon size={30} />
                        </NavigationButton>
                    </div>
                </Section>

                <Section num="12" title="TEXTE & LANGUE">
                    <span className={styles.group_label}>RichText — rendu sûr de &lt;bold&gt;</span>
                    <div className={styles.richtext_demo}>
                        <RichText
                            type="paragraph"
                            content="Bonjour, je suis <bold>Baptiste</bold>, ingénieur software &amp; data."
                        />
                        <RichText
                            type="list"
                            items={[
                                { content: "Un point <bold>important</bold>" },
                                { content: "Un point avec sous-éléments", subitems: ["détail A", "détail B"] },
                            ]}
                        />
                    </div>
                    <span className={styles.group_label}>LanguageSwitcher (contexte nav sombre)</span>
                    <div className={styles.nav_context}>
                        <LanguageSwitcher />
                    </div>
                </Section>

                <Section num="13" title="EXEMPLE — CARTE EXPÉRIENCE">
                    <Surface as="article" variant="glow" corners className={styles.exp_card}>
                        <div className={styles.exp_meta}>
                            <MonoLabel>2020 — NOW</MonoLabel>
                            <span className={styles.exp_dot} />
                            <MonoLabel>PAU · FR</MonoLabel>
                        </div>
                        <h3 className={styles.exp_title}>Software &amp; Data Engineer</h3>
                        <p className={styles.exp_entity}>Some Great Company</p>
                        <p className={styles.exp_desc}>
                            Design et mise en production de pipelines de données et d&apos;applications web,
                            de la conception à l&apos;exploitation.
                        </p>
                        <div className={styles.chips_row}>
                            <Tag>Airflow</Tag>
                            <Tag>Spark</Tag>
                            <Tag>Next.js</Tag>
                            <Tag>AWS</Tag>
                        </div>
                    </Surface>
                    <CompNote>Composition Surface + MonoLabel + Tag → future carte de timeline CV</CompNote>
                </Section>
            </motion.div>
        </PageBackground>
    );
}

/* Local swatch renderer. */
const Swatch = ({ name, v, light }) => (
    <div className={styles.swatch}>
        <div
            className={`${styles.swatch_color} ${light ? styles.swatch_color_bordered : ""}`}
            style={{ background: `var(${v})` }}
        />
        <div className={styles.swatch_meta}>
            <span className={styles.swatch_name}>{name}</span>
            <span className={styles.swatch_hex}>{v}</span>
        </div>
    </div>
);
