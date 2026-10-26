# Carbox — Macromolecular Crystallographic Validation Platform

<p align="center">
  <img src="assets/carbox_logo.svg" alt="Carbox Logo" width="160" />
</p>

<p align="center">
  <strong>Structural Identification of Anomalous Carboxyl Protonation States, Low-Barrier Hydrogen Bonds, and Microenvironment Dielectric Shielding</strong>
</p>

<p align="center">
  <a href="https://project-carbox.github.io/"><img src="https://img.shields.io/badge/Live_Portal-project--carbox.github.io-00e5ff?style=flat-square&logo=githubpages" alt="Live Site" /></a>
  <a href="https://colab.research.google.com/github/project-carbox/carbox/blob/main/notebooks/Carbox_Garib_Murshudov_4Stages_Colab.ipynb"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" /></a>
  <a href="https://github.com/project-carbox/carbox"><img src="https://img.shields.io/badge/Core_Engine-project--carbox/carbox-10b981?style=flat-square&logo=github" alt="Core Engine" /></a>
  <a href="https://github.com/carboxmol"><img src="https://img.shields.io/badge/Desktop_Suite-CarboxMol-7c3aed?style=flat-square" alt="CarboxMol" /></a>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
</p>

---

## 🔬 Overview

**Carbox** (`project-carbox.github.io`) is the official public web showcase for the Carbox research platform. Designed by **Suleiman M Hajizadeh** in collaboration with **Prof. Garib N Murshudov** (MRC-LMB Cambridge), this portal presents a rigorous crystallographic validation framework engineered to distinguish genuine shared-proton Low-Barrier Hydrogen Bonds (LBHBs) from refinement artifacts, thermal disorder, and unmodeled cation complexes across the Protein Data Bank (PDB).

> *"If there is no electron density for atoms, they are mismodeled. If atoms are mismodeled, the distance between them is completely meaningless."*  
> — **Prof. Garib N Murshudov**, MRC Laboratory of Molecular Biology (Cambridge)

---

## 🚀 Key Showcase Features

1. **The 4-Stage Precision Protocol**:
   - **Stage 1 (Geometric Mining & Burial)**: Euclidean distance scanning ($d(O \cdots O) \le 3.20$ Å, LBHB cutoff $\le 2.55$ Å) and solvent exclusion ($d(\text{water}) > 3.0$ Å).
   - **Stage 2 (Non-Parametric Pruning)**: Dual-tier filtering using non-parametric Tukey Interquartile Range (IQR, $\alpha \in \{1.5, 3.0\}$) on atomic $B$-factors and Fisher $z$-transformed Real-Space Correlation Coefficients (RSCC).
   - **Stage 3 (Biochemical Protonation Modeling)**: PROPKA 3 integration measuring electrostatic $\Delta \text{p}K_a \ge +2.0$ shifts in low dielectric pockets ($\varepsilon \approx 2\text{--}4$).
   - **Stage 4 (Golden Benchmark Library)**: Direct validation against 10–20 universally accepted catalytic and structural LBHBs before batch scaling.
2. **Interactive 3D Molecular Graphics**:
   - In-browser WebGL rendering using **3Dmol.js** (zero server requirements, lightweight, fast loading).
   - Interactive presets for `1KZK` (HIV-1 Protease), `1OEW` (Endothiapepsin), `2DSX` (Rubredoxin), and `1FKN` (BACE-1).
3. **Filterable Golden Benchmarks Table**:
   - Real-time search and filtering for sub-angstrom and atomic-resolution structures.
4. **Zero-Dependency Static Architecture**:
   - 100% static client-side frontend (HTML5, modern CSS3 Glassmorphism, Vanilla ES6+ JS).
   - Instant deployment on GitHub Pages.

---

## 👥 Scientific Leadership & Affiliations

- **Suleiman M Hajizadeh**  
  *Institute of Molecular Biology, Ministry of Science and Education of the Republic of Azerbaijan*  
  *Western Caspian University, Baku, Azerbaijan*

- **Garib N Murshudov**  
  *MRC Laboratory of Molecular Biology (LMB), Cambridge Biomedical Campus, Cambridge, United Kingdom*

---

## 📖 Citation

If you use the Carbox platform, benchmark datasets, or methodology in your research, please cite:

```bibtex
@article{HajizadehMurshudov2026,
  author    = {Hajizadeh, Suleiman M and Murshudov, Garib N},
  title     = {Structural Identification of Anomalous Carboxyl Protonation States,
               Low-Barrier Hydrogen Bonds, and Microenvironment Dielectric Shielding
               in High-Resolution Protein Crystal Structures},
  journal   = {Carbox & CarboxMol Macromolecular Crystallography Suite},
  year      = {2026},
  volume    = {0},
  number    = {4},
  pages     = {1--35},
  publisher = {Project Carbox},
  url       = {https://project-carbox.github.io/}
}
```

---

## 🔗 Related Repositories

- **Core Engine & Colab Notebook**: [`project-carbox/carbox`](https://github.com/project-carbox/carbox)
- **Desktop 3D Electron Density Suite**: [`carboxmol/carboxmol`](https://github.com/carboxmol/carboxmol)
- **Project Organization**: [`project-carbox`](https://github.com/project-carbox)
