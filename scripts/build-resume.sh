#!/usr/bin/env bash
#
# Compiles the two LaTeX CVs into the PDFs the site serves.
#
# The sources live in latex/ rather than next to their output, because
# everything under public/ is served verbatim by Next.js — that would put the
# .tex sources and every .aux/.fls/.fdb_latexmk file online. Only the two PDFs
# belong there, under the exact names src/app/resume/page.js links to.
#
# Usage: npm run resume
set -euo pipefail

# MacTeX symlinks its binaries here but only adds them to interactive shells.
export PATH="$PATH:/Library/TeX/texbin"

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$ROOT/latex"
BUILD_DIR="$SRC_DIR/.build"
OUT_DIR="$ROOT/public/resume"

if ! command -v pdflatex >/dev/null 2>&1; then
    cat >&2 <<'MSG'
pdflatex introuvable — aucune distribution TeX n'est installée.

    brew install --cask mactex-no-gui

puis rouvre un terminal : l'installeur ajoute /Library/TeX/texbin au PATH.
MSG
    exit 1
fi

mkdir -p "$BUILD_DIR" "$OUT_DIR"

build() {
    local locale="$1"
    local src="$SRC_DIR/resume_$locale.tex"
    local out="$OUT_DIR/resume_dubillaud_baptiste_freelance_$locale.pdf"
    local log="$BUILD_DIR/build_$locale.out"

    if [ ! -f "$src" ]; then
        echo "Source manquante : $src" >&2
        exit 1
    fi

    echo "→ $(basename "$src")"

    if command -v latexmk >/dev/null 2>&1; then
        # latexmk reruns pdflatex as long as the .aux keeps changing, which
        # \pageref{LastPage} in the footer needs.
        set -- latexmk -pdf -silent -outdir="$BUILD_DIR" \
            -pdflatex='pdflatex -halt-on-error -file-line-error -interaction=nonstopmode %O %S' \
            "$src"
    else
        set -- pdflatex -halt-on-error -file-line-error -interaction=nonstopmode \
            -output-directory="$BUILD_DIR" "$src"
    fi

    if ! "$@" >"$log" 2>&1; then
        echo "Échec de la compilation ($locale) :" >&2
        grep -E '^(!|.*:[0-9]+:)' "$BUILD_DIR/resume_$locale.log" "$log" 2>/dev/null | head -20 >&2
        echo "Log complet : $BUILD_DIR/resume_$locale.log" >&2
        exit 1
    fi

    # Without latexmk, a second pass is what resolves \pageref{LastPage}.
    if ! command -v latexmk >/dev/null 2>&1; then
        "$@" >"$log" 2>&1
    fi

    cp "$BUILD_DIR/resume_$locale.pdf" "$out"
    echo "  → public/resume/$(basename "$out")"
}

for locale in en fr; do
    build "$locale"
done
