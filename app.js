/**
 * Carbox — Public Showcase Frontend
 * Authors: Suleiman M Hajizadeh & Garib N Murshudov
 * Clean, lightweight, publication-grade frontend logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initStepper();
    initViewer();
    initBenchmarksTable();
    initBibtexCopy();
    initNavbarScroll();
});

/* ==========================================================================
   1. 4-Stage Protocol Stepper Tabs
   ========================================================================== */
function initStepper() {
    const stepButtons = document.querySelectorAll('.step-btn');
    const panes = document.querySelectorAll('.step-pane');

    stepButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const stepNum = btn.getAttribute('data-step');

            // Set active button
            stepButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Switch pane
            panes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `pane-${stepNum}`) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

/* ==========================================================================
   2. Interactive 3Dmol.js Molecular Graphics Viewer
   ========================================================================== */
const CASE_STUDIES = {
    '1kzk': {
        pdb: '1kzk',
        name: 'HIV-1 Protease Catalytic Dyad',
        res: '1.09 Å',
        dyad: 'A:ASP25 ··· B:ASP25\'',
        dist: '2.45 Å (Ultra-Short LBHB)',
        env: 'Buried (d_water = 4.2 Å)',
        status: 'Golden Reliable (Murshudov Tier A)',
        desc: 'Symmetrical homodimer interface where two invariant Asp25 residues share a central proton with elevated pKa (>6.5) to perform general acid-base catalysis of viral polyprotein cleavage.',
        focus: [
            { chain: 'A', resi: 25 },
            { chain: 'B', resi: 25 }
        ],
        distanceResidues: {
            atom1: { chain: 'A', resi: 25, atom: 'OD2' },
            atom2: { chain: 'B', resi: 25, atom: 'OD2' }
        }
    },
    '1oew': {
        pdb: '1oew',
        name: 'Endothiapepsin Acid Protease',
        res: '0.90 Å',
        dyad: 'A:ASP35 ··· A:ASP218',
        dist: '2.52 Å (Catalytic LBHB)',
        env: 'Buried (d_water = 3.6 Å)',
        status: 'Golden Reliable (Murshudov Tier A)',
        desc: 'Ultra-high resolution sub-angstrom fungal aspartic protease showing an asymmetric catalytic dyad with continuous 2mFo-DFc electron density and strictly coplanar carboxyl geometry.',
        focus: [
            { chain: 'A', resi: 35 },
            { chain: 'A', resi: 218 }
        ],
        distanceResidues: {
            atom1: { chain: 'A', resi: 35, atom: 'OD2' },
            atom2: { chain: 'A', resi: 218, atom: 'OD1' }
        }
    },
    '2dsx': {
        pdb: '2dsx',
        name: 'Rubredoxin Buried Core',
        res: '0.68 Å',
        dyad: 'A:ASP35 ··· A:ASP47',
        dist: '2.41 Å (Ultra-Short LBHB)',
        env: 'Buried Core (d_water = 4.8 Å)',
        status: 'Golden Reliable (Murshudov Tier A)',
        desc: 'Atomic-resolution rubredoxin possessing an ultra-short LBHB buried within hydrophobic core side chains, protected from bulk solvent dielectric shielding (local ε ≈ 2-4).',
        focus: [
            { chain: 'A', resi: 35 },
            { chain: 'A', resi: 47 }
        ],
        distanceResidues: {
            atom1: { chain: 'A', resi: 35, atom: 'OD1' },
            atom2: { chain: 'A', resi: 47, atom: 'OD2' }
        }
    },
    '1fkn': {
        pdb: '1fkn',
        name: 'BACE-1 Alzheimer Beta-Secretase',
        res: '1.90 Å',
        dyad: 'A:ASP32 ··· A:ASP228',
        dist: '2.58 Å (Catalytic Dyad)',
        env: 'Pocket (d_water = 3.2 Å)',
        status: 'Golden Reliable (Murshudov Tier A)',
        desc: 'Human beta-secretase responsible for generating neurotoxic amyloid-beta plaques in Alzheimer disease. The Asp32/Asp228 dyad operates via an anomalous mono-protonated state.',
        focus: [
            { chain: 'A', resi: 32 },
            { chain: 'A', resi: 228 }
        ],
        distanceResidues: {
            atom1: { chain: 'A', resi: 32, atom: 'OD2' },
            atom2: { chain: 'A', resi: 228, atom: 'OD1' }
        }
    }
};

let glViewer = null;

function initViewer() {
    const container = document.getElementById('mol-viewport');
    if (!container || typeof $3Dmol === 'undefined') return;

    // Create 3Dmol viewer instance
    try {
        glViewer = $3Dmol.createViewer(container, {
            defaultcolors: $3Dmol.rasmolElementColors,
            backgroundColor: '#07090e'
        });
    } catch (e) {
        console.error('Failed to initialize 3Dmol viewer:', e);
        container.innerHTML = `<div class="viewer-fallback-msg"><i class="fa-solid fa-triangle-exclamation"></i> WebGL not supported or disabled in this browser.</div>`;
        return;
    }

    // Set up preset button clicks
    const presetBtns = document.querySelectorAll('.preset-btn');
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const pdbKey = btn.getAttribute('data-pdb');
            loadStructure(pdbKey);
        });
    });

    // Initial load: 1KZK
    loadStructure('1kzk');
}

function loadStructure(pdbKey) {
    const caseData = CASE_STUDIES[pdbKey];
    if (!caseData || !glViewer) return;

    // Update metadata card
    const titleEl = document.getElementById('v-title');
    const pdbEl = document.getElementById('v-pdb');
    const resEl = document.getElementById('v-res');
    const pairEl = document.getElementById('v-pair');
    const distEl = document.getElementById('v-dist');
    const envEl = document.getElementById('v-env');
    const descEl = document.getElementById('v-desc');

    if (titleEl) titleEl.textContent = caseData.name;
    if (pdbEl) pdbEl.textContent = caseData.pdb.toUpperCase();
    if (resEl) resEl.textContent = caseData.res;
    if (pairEl) pairEl.textContent = caseData.dyad;
    if (distEl) distEl.textContent = caseData.dist;
    if (envEl) envEl.textContent = caseData.env;
    if (descEl) descEl.textContent = caseData.desc;

    // Clear and display loading spinner
    glViewer.clear();
    const container = document.getElementById('mol-viewport');
    
    // Add lightweight loading overlay
    let loader = document.getElementById('mol-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'mol-loader';
        loader.className = 'mol-loader';
        loader.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Fetching ${caseData.pdb.toUpperCase()} from RCSB...</span>`;
        container.appendChild(loader);
    }
    loader.style.display = 'flex';

    const pdbUrl = `https://files.rcsb.org/download/${caseData.pdb.toUpperCase()}.pdb`;

    fetch(pdbUrl)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(pdbData => {
            if (loader) loader.style.display = 'none';
            glViewer.clear();
            glViewer.addModel(pdbData, 'pdb');

            // Global cartoon style (dark cyan/slate)
            glViewer.setStyle({}, {
                cartoon: {
                    color: '#1e293b',
                    opacity: 0.65
                }
            });

            // Highlight catalytic residues in sticks with glowing cyan & magenta carbons
            caseData.focus.forEach((f, idx) => {
                const sel = { chain: f.chain, resi: f.resi };
                glViewer.setStyle(sel, {
                    stick: {
                        colorscheme: idx === 0 ? 'cyanCarbon' : 'magentaCarbon',
                        radius: 0.28
                    }
                });

                // Add 3D text label
                glViewer.addLabel(`${f.chain}:${f.resi}`, {
                    position: { sel: sel },
                    fontSize: 12,
                    fontColor: '#00f2fe',
                    backgroundColor: 'rgba(7, 9, 14, 0.85)',
                    backgroundOpacity: 0.8,
                    borderColor: '#38ef7d',
                    borderThickness: 1
                });
            });

            // Zoom closely to catalytic pocket
            const focusSel = caseData.focus.map(f => ({ chain: f.chain, resi: f.resi }));
            glViewer.zoomTo(focusSel, 1000);
            glViewer.render();
        })
        .catch(err => {
            console.warn(`Failed to fetch PDB from RCSB: ${err.message}. Generating mock wireframe geometry...`);
            if (loader) loader.style.display = 'none';

            // Clean fallback: create simulated catalytic carboxylate geometry
            renderSimulatedDyad(glViewer, caseData);
        });
}

function renderSimulatedDyad(viewer, caseData) {
    viewer.clear();
    // In case user is offline or RCSB CORS blocked, display 3D bounding geometry
    viewer.addSphere({ center: { x: -1.2, y: 0, z: 0 }, radius: 0.6, color: '#00f2fe' });
    viewer.addSphere({ center: { x: 1.2, y: 0, z: 0 }, radius: 0.6, color: '#38ef7d' });
    viewer.addCylinder({
        start: { x: -1.2, y: 0, z: 0 },
        end: { x: 1.2, y: 0, z: 0 },
        radius: 0.12,
        dashed: true,
        color: '#fbbf24'
    });
    viewer.addLabel(`${caseData.dyad} (${caseData.dist.split(' ')[0]})`, {
        position: { x: 0, y: 0.8, z: 0 },
        fontSize: 12,
        fontColor: '#ffffff',
        backgroundColor: '#07090e'
    });
    viewer.zoomTo();
    viewer.render();
}

/* ==========================================================================
   3. Golden Benchmarks Dataset & Table Operations
   ========================================================================== */
const BENCHMARK_DATA = [
    {
        pdb: '1KZK',
        resolution: 1.09,
        pair: 'A:ASP25 ··· B:ASP25\'',
        dist: 2.45,
        water: 4.20,
        bMax: 11.4,
        tukeyLimit: 22.1,
        verdict: 'Golden (Catalytic LBHB, HIV-1 Protease)',
        isLbhb: true,
        isBuried: true
    },
    {
        pdb: '1OEW',
        resolution: 0.90,
        pair: 'A:ASP35 ··· A:ASP218',
        dist: 2.52,
        water: 3.60,
        bMax: 9.8,
        tukeyLimit: 18.5,
        verdict: 'Golden (Catalytic LBHB, Endothiapepsin)',
        isLbhb: true,
        isBuried: true
    },
    {
        pdb: '2DSX',
        resolution: 0.68,
        pair: 'A:ASP35 ··· A:ASP47',
        dist: 2.41,
        water: 4.80,
        bMax: 6.2,
        tukeyLimit: 14.1,
        verdict: 'Golden (Buried Core LBHB, Rubredoxin)',
        isLbhb: true,
        isBuried: true
    },
    {
        pdb: '4ZM7',
        resolution: 0.70,
        pair: 'A:ASP149 ··· A:GLU162',
        dist: 2.48,
        water: 3.90,
        bMax: 7.1,
        tukeyLimit: 15.3,
        verdict: 'Golden (Proton-Relay LBHB, Aminopeptidase)',
        isLbhb: true,
        isBuried: true
    },
    {
        pdb: '3X2M',
        resolution: 0.93,
        pair: 'A:ASP102 ··· A:GLU144',
        dist: 2.54,
        water: 4.10,
        bMax: 8.4,
        tukeyLimit: 17.0,
        verdict: 'Golden (Buried Shared H-Bond, Hydrolase)',
        isLbhb: true,
        isBuried: true
    },
    {
        pdb: '1FKN',
        resolution: 1.90,
        pair: 'A:ASP32 ··· A:ASP228',
        dist: 2.58,
        water: 3.20,
        bMax: 18.3,
        tukeyLimit: 31.0,
        verdict: 'Golden (Catalytic Dyad, BACE-1 Secretase)',
        isLbhb: false,
        isBuried: true
    },
    {
        pdb: '2B97',
        resolution: 0.98,
        pair: 'A:ASP70 ··· A:HIS31',
        dist: 2.59,
        water: 3.50,
        bMax: 9.1,
        tukeyLimit: 19.2,
        verdict: 'Golden (Acid-Base Dyad, T4 Lysozyme)',
        isLbhb: false,
        isBuried: true
    },
    {
        pdb: '2J9W',
        resolution: 0.88,
        pair: 'A:GLU68 ··· A:GLU121',
        dist: 2.49,
        water: 3.70,
        bMax: 8.9,
        tukeyLimit: 16.7,
        verdict: 'Golden (Ultra-Short Glu-Glu, Isomerase)',
        isLbhb: true,
        isBuried: true
    },
    {
        pdb: '3U7T',
        resolution: 1.05,
        pair: 'A:ASP114 ··· A:ASP133',
        dist: 2.51,
        water: 4.40,
        bMax: 10.5,
        tukeyLimit: 20.3,
        verdict: 'Golden (Symmetrical Acid Dyad, Phosphatase)',
        isLbhb: true,
        isBuried: true
    },
    {
        pdb: '1M40',
        resolution: 0.99,
        pair: 'A:ASP194 ··· A:ASP206',
        dist: 2.47,
        water: 4.00,
        bMax: 9.5,
        tukeyLimit: 18.9,
        verdict: 'Golden (Buried Asp Dyad, Aldolase)',
        isLbhb: true,
        isBuried: true
    },
    {
        pdb: '1G6S',
        resolution: 1.15,
        pair: 'A:GLU166 ··· A:HIS41',
        dist: 2.62,
        water: 3.10,
        bMax: 14.2,
        tukeyLimit: 25.8,
        verdict: 'Golden (Catalytic Base Dyad, 3CLpro)',
        isLbhb: false,
        isBuried: true
    },
    {
        pdb: '1LZ1',
        resolution: 1.30,
        pair: 'A:GLU35 ··· A:ASP52',
        dist: 2.68,
        water: 2.80,
        bMax: 12.1,
        tukeyLimit: 24.5,
        verdict: 'Validated (Solvent Exposed, Hen Lysozyme)',
        isLbhb: false,
        isBuried: false
    }
];

function initBenchmarksTable() {
    const tbody = document.getElementById('benchmarks-tbody');
    const searchInput = document.getElementById('table-search');
    const filterPills = document.querySelectorAll('.pill-btn');

    let currentFilter = 'all';
    let searchQuery = '';

    function render() {
        if (!tbody) return;

        const filtered = BENCHMARK_DATA.filter(row => {
            // Pill filter
            if (currentFilter === 'lbhb' && !row.isLbhb) return false;
            if (currentFilter === 'buried' && !row.isBuried) return false;

            // Search input
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const matched = (
                    row.pdb.toLowerCase().includes(q) ||
                    row.pair.toLowerCase().includes(q) ||
                    row.verdict.toLowerCase().includes(q)
                );
                if (!matched) return false;
            }

            return true;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" class="empty-table-msg">No matching benchmarks found.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(item => `
            <tr>
                <td><strong class="pdb-tag">${item.pdb}</strong></td>
                <td><span class="res-tag">${item.resolution.toFixed(2)} Å</span></td>
                <td><code>${item.pair}</code></td>
                <td><span class="${item.dist <= 2.55 ? 'dist-lbhb' : 'dist-norm'}">${item.dist.toFixed(2)} Å</span></td>
                <td><span class="${item.water >= 3.0 ? 'env-buried' : 'env-exposed'}">${item.water.toFixed(2)} Å</span></td>
                <td>${item.bMax.toFixed(1)} Å²</td>
                <td><span class="b-cutoff">&le; ${item.tukeyLimit.toFixed(1)} Å²</span></td>
                <td><span class="status-pill ${item.verdict.startsWith('Golden') ? 'green' : 'blue'}">${item.verdict}</span></td>
            </tr>
        `).join('');
    }

    // Search events
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            render();
        });
    }

    // Filter pill events
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.getAttribute('data-filter');
            render();
        });
    });

    render();
}

/* ==========================================================================
   4. BibTeX Citation Copy to Clipboard
   ========================================================================== */
function initBibtexCopy() {
    const copyBtn = document.getElementById('btn-copy-bibtex');
    const bibtexCode = document.getElementById('bibtex-code');

    if (!copyBtn || !bibtexCode) return;

    copyBtn.addEventListener('click', async () => {
        try {
            const textToCopy = bibtexCode.innerText.trim();
            await navigator.clipboard.writeText(textToCopy);

            const origHtml = copyBtn.innerHTML;
            copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
            copyBtn.classList.add('btn-copied');

            setTimeout(() => {
                copyBtn.innerHTML = origHtml;
                copyBtn.classList.remove('btn-copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    });
}

/* ==========================================================================
   5. Smooth Scrolling & Active Navbar Link Update
   ========================================================================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        // Sticky glass elevation
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link tracking
        let currentSectionId = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            const height = sec.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}
