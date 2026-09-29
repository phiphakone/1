const progressBar = document.getElementById('progressBar');
const navDots = document.querySelectorAll('.nav-dots a');
const sections = document.querySelectorAll('.section');

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight) * 100 + '%';
  let current = 0;
  sections.forEach((sec, i) => {
    if (sec.getBoundingClientRect().top <= window.innerHeight / 2) current = i;
  });
  navDots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}
window.addEventListener('scroll', updateProgress);
updateProgress();

navDots.forEach(dot => {
  dot.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(dot.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

const revealElements = document.querySelectorAll('.card, .step, .complex-card, .code-panel, .student-table, .point, .thank-you, .compare-table-wrapper');
revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = Math.min(i % 4, 3) * 0.08 + 's';
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealElements.forEach(el => observer.observe(el));

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.code-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Insertion Sort visualizer for [12,11,13,5,6]
const steps = [
  { label: 'Ban đầu', values: [12,11,13,5,6], highlight: [], sortedUpTo: 0, explanation: 'Mảng ban đầu: 12, 11, 13, 5, 6. Phần tử đầu (12) coi như đã sắp.' },
  { label: 'i=1 – Chèn 11', values: [11,12,13,5,6], highlight: [0,1], sortedUpTo: 1, explanation: 'key=11. Dịch 12 sang phải, chèn 11 vào đầu. Mảng: 11, 12, 13, 5, 6' },
  { label: 'i=2 – 13 đúng', values: [11,12,13,5,6], highlight: [2], sortedUpTo: 2, explanation: 'key=13. Không có phần tử nào lớn hơn → giữ nguyên vị trí.' },
  { label: 'i=3 – Chèn 5', values: [5,11,12,13,6], highlight: [0,1,2,3], sortedUpTo: 3, explanation: 'key=5. Dịch 11,12,13 sang phải, chèn 5 vào đầu. Mảng: 5, 11, 12, 13, 6' },
  { label: 'i=4 – Chèn 6', values: [5,6,11,12,13], highlight: [1,2], sortedUpTo: 4, explanation: 'key=6. Dịch 11,12,13 sang phải, chèn 6 vào vị trí thứ 2. Mảng: 5, 6, 11, 12, 13' },
  { label: 'Hoàn tất', values: [5,6,11,12,13], highlight: [], sortedUpTo: 4, explanation: 'Mảng đã sắp xếp tăng dần: 5, 6, 11, 12, 13' }
];

let currentStep = 0;
const arrayState = document.getElementById('arrayState');
const stepLabel = document.getElementById('stepLabel');
const stepExplanation = document.getElementById('stepExplanation');
const prevBtn = document.getElementById('prevStep');
const nextBtn = document.getElementById('nextStep');
const maxVal = 13;

function renderStep(idx) {
  const step = steps[idx];
  stepLabel.textContent = step.label;
  stepExplanation.textContent = step.explanation;
  arrayState.innerHTML = '';
  step.values.forEach((val, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'bar-wrapper';
    if (step.highlight.includes(i)) wrapper.classList.add('min');
    if (i <= step.sortedUpTo) wrapper.classList.add('sorted');
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = Math.max(22, (val / maxVal) * 180) + 'px';
    const label = document.createElement('span');
    label.textContent = val;
    wrapper.appendChild(bar);
    wrapper.appendChild(label);
    arrayState.appendChild(wrapper);
  });
  prevBtn.disabled = idx === 0;
  nextBtn.disabled = idx === steps.length - 1;
}

prevBtn.addEventListener('click', () => { if (currentStep > 0) { currentStep--; renderStep(currentStep); } });
nextBtn.addEventListener('click', () => { if (currentStep < steps.length - 1) { currentStep++; renderStep(currentStep); } });
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
});
renderStep(0);
