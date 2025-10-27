
/* script.js - interaction logic for GeoLab AR (3D interactive) */

let current = null;

const DATA = {
  'vulkanik': {
    title: 'Tanah Vulkanik',
    text: 'Tanah vulkanik berasal dari material letusan. Umumnya berbutir halus, kaya mineral, dan subur.',
    hotspots: {
      'hot1': { title: 'Lapisan Permukaan', text: 'Lapisan humus tipis; warna gelap.' },
      'hot2': { title: 'Batuan Terakumulasi', text: 'Material andesit/batuan vulkanik di lapisan B.' }
    }
  },
  'laterit': {
    title: 'Tanah Laterit',
    text: 'Laterit terjadi karena proses laterisasi; berwarna merah akibat oksida besi dan berdrainase buruk.',
    hotspots: {
      'hot1': { title: 'Lapisan O/A', text: 'Organik tipis; mudah erosi.' },
      'hot2': { title: 'Lapisan B', text: 'Kaya oksida besi; permeabilitas rendah.' }
    }
  },
  'alluvial': {
    title: 'Tanah Alluvial',
    text: 'Alluvial berasal dari endapan sungai; bertekstur halus dan umumnya subur untuk pertanian.',
    hotspots: {
      'hot1': { title: 'Lapisan Atas', text: 'Endapan lanau/lempung; subur.' },
      'hot2': { title: 'Lapisan Bawah', text: 'Pasir/sedimen kasar; drainase baik.' }
    }
  }
};

function showModel(key) {
  // hide all
  document.getElementById('vulkanikModel').setAttribute('visible','false');
  document.getElementById('lateritModel').setAttribute('visible','false');
  document.getElementById('alluvialModel').setAttribute('visible','false');

  // show selected
  const id = key + 'Model';
  const el = document.getElementById(id);
  if (el) el.setAttribute('visible','true');
}

function selectSoil(key) {
  current = key;
  showModel(key);
  showInfo(DATA[key].title, DATA[key].text);
}

function showInfo(title, text) {
  document.getElementById('infoTitle').innerText = title;
  document.getElementById('infoText').innerText = text;
  document.getElementById('infoBox').style.display = 'block';
}

function hideInfo() {
  document.getElementById('infoBox').style.display = 'none';
}

function openLKS() {
  // sample Google Form; user can replace with their own
  window.open('https://forms.gle/example-lks', '_blank');
}

// Hotspot handling
document.addEventListener('DOMContentLoaded', () => {
  const hotspots = document.querySelectorAll('.clickable');
  hotspots.forEach(hs => {
    hs.addEventListener('click', (ev) => {
      if (!current) {
        showInfo('Pilih Jenis Tanah', 'Pilih jenis tanah terlebih dahulu dengan tombol di atas.');
        return;
      }
      const hid = hs.getAttribute('id');
      const info = DATA[current].hotspots[hid];
      if (info) showInfo(info.title, info.text);
      else showInfo('Info', 'Tidak ada informasi untuk hotspot ini.');
    });
  });

  // support touch events via raycaster (A-Frame)
  const scene = document.querySelector('a-scene');
  if (scene) {
    scene.addEventListener('click', function (e) {
      // fallback - handled by entity click listeners
    });
  }
});
