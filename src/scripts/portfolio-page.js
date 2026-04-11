import { calculateTargetGain, getTimelineLabel, isValidEmail } from '../utils/portfolio-helpers.js';

export function initPortfolioPage() {
				const root = document.documentElement;
				const isPolish = root.classList.contains('lang-pl');
	
			document.querySelectorAll('[data-ph-pl]').forEach((node) => {
				const element = /** @type {HTMLElement} */ (node);
				const phPl = element.getAttribute('data-ph-pl') || '';
				const phEn = element.getAttribute('data-ph-en') || phPl;
				element.setAttribute('placeholder', isPolish ? phPl : phEn);
			});
	
			document.querySelectorAll('option[data-label-pl]').forEach((node) => {
				const option = /** @type {HTMLOptionElement} */ (node);
				const labelPl = option.getAttribute('data-label-pl') || option.textContent || '';
				const labelEn = option.getAttribute('data-label-en') || labelPl;
				option.textContent = isPolish ? labelPl : labelEn;
			});
	
			const rail = document.getElementById('horizontal-rail');
			const hint = document.getElementById('scroll-hint');
			const brighten = document.querySelector('.scroll-brighten');
			const desktop = window.matchMedia('(min-width: 921px)');
			const previewBg = document.getElementById('project-preview-bg');
			const previewFrames = Array.from(document.querySelectorAll('.project-preview-frame'));
			const projectCards = Array.from(document.querySelectorAll('.project-frame[data-preview-target]'));
	
			if (previewBg instanceof HTMLElement && previewFrames.length > 0 && projectCards.length > 0) {
				const setPreview = (previewId) => {
					const isActive = Boolean(previewId) && desktop.matches;
					previewBg.classList.toggle('is-active', isActive);
					previewFrames.forEach((frame) => {
						const image = /** @type {HTMLElement} */ (frame);
						image.classList.toggle('is-active', isActive && image.dataset.previewId === previewId);
					});
				};
	
				projectCards.forEach((card) => {
					const element = /** @type {HTMLElement} */ (card);
					const previewId = element.dataset.previewTarget || '';
					element.addEventListener('pointerenter', () => setPreview(previewId));
					element.addEventListener('focusin', () => setPreview(previewId));
				});
	
				const clearPreview = () => setPreview('');
				const grid = document.querySelector('.project-grid');
				if (grid instanceof HTMLElement) {
					grid.addEventListener('pointerleave', clearPreview);
					grid.addEventListener('focusout', () => {
						setTimeout(() => {
							const active = document.activeElement;
							if (!(active instanceof HTMLElement) || !grid.contains(active)) clearPreview();
						}, 0);
					});
				}
	
				desktop.addEventListener('change', () => {
					if (!desktop.matches) clearPreview();
				});
			}
	
			if (rail) {
				const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
				let target = rail.scrollLeft;
				let current = rail.scrollLeft;
				let raf = 0;
	
				const updateProgress = () => {
					const max = rail.scrollWidth - rail.clientWidth;
					const progress = max > 0 ? rail.scrollLeft / max : 0;
					const eased = Math.pow(progress, 0.82);
					root.style.setProperty('--scroll-progress', eased.toFixed(4));
					if (brighten instanceof HTMLElement) {
						brighten.style.opacity = String(0.04 + eased * 0.92);
						brighten.style.transform = `translate3d(${(eased * 6).toFixed(2)}vw, 0, 0)`;
					}
				};
	
				const syncState = () => {
					target = rail.scrollLeft;
					current = rail.scrollLeft;
				};
	
				const updateHint = () => {
					if (!hint) return;
					if (!desktop.matches || rail.scrollLeft > 60) hint.classList.add('is-hidden');
					else hint.classList.remove('is-hidden');
				};
	
				const animate = () => {
					const diff = target - current;
					current += diff * 0.16;
					rail.scrollLeft = current;
					updateHint();
					updateProgress();
					if (Math.abs(diff) > 0.3) raf = requestAnimationFrame(animate);
					else {
						syncState();
						updateProgress();
						raf = 0;
					}
				};
	
				const moveBy = (delta) => {
					if (!raf) syncState();
					target = clamp(target + delta, 0, rail.scrollWidth - rail.clientWidth);
					if (!raf) raf = requestAnimationFrame(animate);
				};
	
				const onWheel = (event) => {
					if (!desktop.matches) return;
					const source = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
					if (source === 0) return;
					event.preventDefault();
					const normalized = Math.sign(source) * Math.min(Math.abs(source), 95);
					moveBy(normalized * 2.2);
				};
	
				const onKey = (event) => {
					if (!desktop.matches) return;
					if (event.key === 'ArrowDown' || event.key === 'PageDown') {
						event.preventDefault();
						moveBy(window.innerWidth * 0.86);
					}
					if (event.key === 'ArrowUp' || event.key === 'PageUp') {
						event.preventDefault();
						moveBy(-window.innerWidth * 0.86);
					}
				};
	
				const onDesktopChange = () => {
					if (!desktop.matches) {
						if (raf) {
							cancelAnimationFrame(raf);
							raf = 0;
						}
						rail.scrollLeft = 0;
						target = 0;
						current = 0;
						root.style.setProperty('--scroll-progress', '0');
						if (brighten instanceof HTMLElement) {
							brighten.style.opacity = '0.04';
							brighten.style.transform = 'translate3d(0, 0, 0)';
						}
					}
					updateHint();
					updateProgress();
				};
	
				const onRailScroll = () => {
					updateHint();
					updateProgress();
					if (!raf) syncState();
				};
	
				window.addEventListener('wheel', onWheel, { passive: false });
				window.addEventListener('keydown', onKey);
				rail.addEventListener('scroll', onRailScroll, { passive: true });
				desktop.addEventListener('change', onDesktopChange);
				updateHint();
				updateProgress();
			}
	
			const logoStage = document.getElementById('nrbck-logo-stage');
			const heroPanel = document.querySelector('.panel-hero');
	
			if (logoStage instanceof HTMLElement && heroPanel instanceof HTMLElement) {
				const resetLogo = () => {
					logoStage.style.setProperty('--logo-tilt-x', '0deg');
					logoStage.style.setProperty('--logo-tilt-y', '0deg');
					logoStage.style.setProperty('--logo-shift-x', '0px');
					logoStage.style.setProperty('--logo-shift-y', '0px');
				};
	
				heroPanel.addEventListener('pointermove', (event) => {
					if (!desktop.matches) return;
					const e = /** @type {PointerEvent} */ (event);
					const rect = heroPanel.getBoundingClientRect();
					const x = (e.clientX - rect.left) / rect.width - 0.5;
					const y = (e.clientY - rect.top) / rect.height - 0.5;
					logoStage.style.setProperty('--logo-tilt-x', `${(-y * 16).toFixed(2)}deg`);
					logoStage.style.setProperty('--logo-tilt-y', `${(x * 18).toFixed(2)}deg`);
					logoStage.style.setProperty('--logo-shift-x', `${(x * 14).toFixed(2)}px`);
					logoStage.style.setProperty('--logo-shift-y', `${(-y * 8).toFixed(2)}px`);
				});
	
				heroPanel.addEventListener('pointerleave', resetLogo);
				desktop.addEventListener('change', () => {
					if (!desktop.matches) resetLogo();
				});
			}
			document.querySelectorAll('.selling-card').forEach((card) => {
				const element = /** @type {HTMLElement} */ (card);
				element.addEventListener('pointermove', (event) => {
					if (!desktop.matches) return;
					const e = /** @type {PointerEvent} */ (event);
					const rect = element.getBoundingClientRect();
					const x = (e.clientX - rect.left) / rect.width - 0.5;
					const y = (e.clientY - rect.top) / rect.height - 0.5;
					element.style.setProperty('--rx', `${(-y * 10.5).toFixed(2)}deg`);
					element.style.setProperty('--ry', `${(x * 11.5).toFixed(2)}deg`);
				});
	
				element.addEventListener('pointerleave', () => {
					element.style.setProperty('--rx', '0deg');
					element.style.setProperty('--ry', '0deg');
				});
			});
	
			const contactForm = document.getElementById('contact-form');
			const contactStatus = document.getElementById('contact-status');
	
			if (contactForm instanceof HTMLFormElement && contactStatus instanceof HTMLElement) {
				const submitButton = contactForm.querySelector('button[type="submit"]');
				const recipient = contactForm.dataset.recipient || 'norbick@gmail.com';
				const subjectField = contactForm.querySelector('[data-contact-subject]');
				const timelineLabelField = contactForm.querySelector('[data-timeline-label]');
				const submitFrame = document.getElementById('contact-submit-frame');
				contactForm.method = 'POST';
				contactForm.action = `https://formsubmit.co/${recipient}`;
				contactForm.target = 'contact-submit-frame';
				let isSending = false;
				let waitingForFrameLoad = false;
	
				const setStatus = (message, state) => {
					contactStatus.textContent = message;
					contactStatus.setAttribute('data-state', state);
				};
	
				if (submitFrame instanceof HTMLIFrameElement) {
					submitFrame.addEventListener('load', () => {
						if (!waitingForFrameLoad) return;
						waitingForFrameLoad = false;
						isSending = false;
						contactForm.removeAttribute('aria-busy');
						if (submitButton instanceof HTMLButtonElement) submitButton.disabled = false;
						contactForm.reset();
						setStatus(
							isPolish
								? 'Wiadomość wysłana. Dzięki, odezwę się najszybciej jak się da.'
								: 'Message sent. Thanks, I will get back to you as soon as I can.',
							'success',
						);
					});
				}
	
				contactForm.addEventListener('submit', (event) => {
					event.preventDefault();
					if (isSending) return;
	
					const formData = new FormData(contactForm);
					const name = String(formData.get('name') || '').trim();
					const email = String(formData.get('email') || '').trim();
					const message = String(formData.get('message') || '').trim();
					const timeline = String(formData.get('timeline') || '').trim();
					const hasValidEmail = isValidEmail(email);
	
					if (!name || !email || !message || !timeline) {
						setStatus(isPolish ? 'Uzupełnij proszę wszystkie pola.' : 'Please fill in all fields.', 'error');
						return;
					}
	
					if (!hasValidEmail) {
						setStatus(isPolish ? 'Podaj poprawny adres e-mail.' : 'Please enter a valid email address.', 'error');
						return;
					}
	
					const timelineLabel = getTimelineLabel(timeline, isPolish);
					const subject = isPolish ? `Nowe zapytanie od ${name}` : `New inquiry from ${name}`;
	
					isSending = true;
					waitingForFrameLoad = true;
					contactForm.setAttribute('aria-busy', 'true');
					if (submitButton instanceof HTMLButtonElement) submitButton.disabled = true;
					setStatus(isPolish ? 'Wysyłam wiadomość...' : 'Sending your message...', 'pending');
	
					if (subjectField instanceof HTMLInputElement) subjectField.value = subject;
					if (timelineLabelField instanceof HTMLInputElement) timelineLabelField.value = timelineLabel;
	
					window.setTimeout(() => {
						if (!waitingForFrameLoad) return;
						waitingForFrameLoad = false;
						isSending = false;
						contactForm.removeAttribute('aria-busy');
						if (submitButton instanceof HTMLButtonElement) submitButton.disabled = false;
						setStatus(
							isPolish
								? 'Coś poszło nie tak przy wysyłce. Spróbuj ponownie za chwilę.'
								: 'Something went wrong while sending. Please try again in a moment.',
							'error',
						);
					}, 12000);
	
					HTMLFormElement.prototype.submit.call(contactForm);
				});
			}
	
			const musicToggle = document.getElementById('music-toggle');
			const musicPlayer = document.getElementById('music-player');
			const musicMute = document.getElementById('music-mute');
			const musicMeterFill = document.getElementById('music-meter-fill');
			const musicSlider = document.getElementById('music-slider');
			const musicLevel = document.getElementById('music-level');
	
			if (musicToggle instanceof HTMLButtonElement) {
				const AudioContextClass = window.AudioContext || window.webkitAudioContext;
	
				if (!AudioContextClass) {
					musicToggle.disabled = true;
					musicToggle.classList.add('is-disabled');
					if (musicPlayer instanceof HTMLElement) {
						musicPlayer.classList.remove('is-open');
						musicPlayer.setAttribute('aria-hidden', 'true');
					}
				} else {
					const chordProgression = [
						{ root: 48, notes: [48, 52, 55, 59, 62] }, // Cmaj9
						{ root: 55, notes: [55, 59, 62, 67, 69] }, // Gadd9
						{ root: 57, notes: [57, 60, 64, 67, 71] }, // Am9
						{ root: 53, notes: [53, 57, 60, 65, 69] }, // Fmaj9
					];
					const leadPattern = [4, null, 3, null, 2, 3, 1, null, 2, null, 3, 4, 2, null, 1, 2];
					const bassPattern = [0, null, 7, null, 0, null, 10, null, 0, null, 7, null, 5, null, 7, null];
					const bpm = 106;
					const stepSeconds = (60 / bpm) / 4;
					const stepsPerBar = 16;
					const barSeconds = stepSeconds * stepsPerBar;
					const scheduleAhead = 0.2;
					const minMasterGain = 0.0001;
					const maxMasterGain = 1.9;
					const minVolumeLevel = 0;
					const maxVolumeLevel = 1;
					let context = null;
					let master = null;
					let musicBus = null;
					let drumBus = null;
					let padBus = null;
					let padFilter = null;
					let bassOsc = null;
					let bassGain = null;
					let fxSend = null;
					let noiseBuffer = null;
					let padVoices = [];
					let schedulerTimer = 0;
					let nextStepAt = 0;
					let stepIndex = 0;
					let isPlaying = false;
					let volumeLevel = 0.5;
					let isMuted = false;
	
					const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
					const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
	
					const setToggleState = (state) => {
						musicToggle.classList.toggle('is-on', state);
						musicToggle.setAttribute('aria-pressed', state ? 'true' : 'false');
					};
	
					const setPlayerOpen = (state) => {
						if (!(musicPlayer instanceof HTMLElement)) return;
						musicPlayer.classList.toggle('is-open', state);
						musicPlayer.setAttribute('aria-hidden', state ? 'false' : 'true');
					};
	
					const targetGain = () => {
						return calculateTargetGain({
							isPlaying,
							isMuted,
							volumeLevel,
							minMasterGain,
							maxMasterGain,
							minVolumeLevel,
							maxVolumeLevel,
						});
					};
	
					const applyMasterGain = (rampSeconds = 0.22) => {
						if (!context || !master) return;
						const now = context.currentTime;
						const to = targetGain();
						master.gain.cancelScheduledValues(now);
						master.gain.setValueAtTime(Math.max(master.gain.value, minMasterGain), now);
						if (to <= minMasterGain * 1.01) {
							master.gain.exponentialRampToValueAtTime(minMasterGain, now + Math.max(0.06, rampSeconds));
							return;
						}
						master.gain.linearRampToValueAtTime(to, now + Math.max(0.06, rampSeconds));
					};
	
					const updatePlayerUi = () => {
						const clampedLevel = clamp(volumeLevel, minVolumeLevel, maxVolumeLevel);
						const percent = Math.round(clampedLevel * 100);
						if (musicMeterFill instanceof HTMLElement) {
							musicMeterFill.style.width = `${percent}%`;
						}
						if (musicSlider instanceof HTMLInputElement) {
							musicSlider.value = String(percent);
							musicSlider.classList.toggle('is-muted', isMuted);
						}
						if (musicLevel instanceof HTMLElement) {
							const prefix = isPolish ? 'GŁOŚNOŚĆ' : 'VOLUME';
							const mutedText = isPolish ? ' (WYCISZONE)' : ' (MUTED)';
							musicLevel.textContent = `${prefix} ${percent}%${isMuted ? mutedText : ''}`;
						}
						if (musicMute instanceof HTMLButtonElement) {
							musicMute.textContent = isMuted ? 'UNMUTE' : 'MUTE';
							musicMute.classList.toggle('is-muted', isMuted);
							musicMute.setAttribute('aria-pressed', isMuted ? 'true' : 'false');
						}
					};
	
					const createNoiseBuffer = () => {
						if (!context || noiseBuffer) return;
						const length = context.sampleRate;
						noiseBuffer = context.createBuffer(1, length, context.sampleRate);
						const data = noiseBuffer.getChannelData(0);
						for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
					};
	
					const createPadVoice = (detune) => {
						const oscA = context.createOscillator();
						oscA.type = 'sawtooth';
						oscA.detune.value = detune;
						const oscB = context.createOscillator();
						oscB.type = 'triangle';
						oscB.detune.value = detune * 0.72;
						const gainA = context.createGain();
						gainA.gain.value = 0.032;
						const gainB = context.createGain();
						gainB.gain.value = 0.02;
						oscA.connect(gainA);
						oscB.connect(gainB);
						gainA.connect(padFilter);
						gainB.connect(padFilter);
						oscA.start();
						oscB.start();
						return { oscA, oscB };
					};
	
					const ensureAudio = () => {
						if (context) return;
						context = new AudioContextClass();
	
						master = context.createGain();
						master.gain.value = minMasterGain;
	
						const masterHighpass = context.createBiquadFilter();
						masterHighpass.type = 'highpass';
						masterHighpass.frequency.value = 30;
	
						const masterLowpass = context.createBiquadFilter();
						masterLowpass.type = 'lowpass';
						masterLowpass.frequency.value = 5200;
						masterLowpass.Q.value = 0.16;
	
						const compressor = context.createDynamicsCompressor();
						compressor.threshold.value = -24;
						compressor.knee.value = 20;
						compressor.ratio.value = 2.1;
						compressor.attack.value = 0.04;
						compressor.release.value = 0.38;
	
						master.connect(masterHighpass);
						masterHighpass.connect(masterLowpass);
						masterLowpass.connect(compressor);
						compressor.connect(context.destination);
	
						musicBus = context.createGain();
						musicBus.gain.value = 1.35;
						musicBus.connect(master);
	
						drumBus = context.createGain();
						drumBus.gain.value = 1.6;
						drumBus.connect(master);
	
						padFilter = context.createBiquadFilter();
						padFilter.type = 'lowpass';
						padFilter.frequency.value = 1480;
						padFilter.Q.value = 0.35;
	
						padBus = context.createGain();
						padBus.gain.value = 0.0001;
						padFilter.connect(padBus);
						padBus.connect(musicBus);
	
						padVoices = [
							createPadVoice(-11),
							createPadVoice(-5),
							createPadVoice(0),
							createPadVoice(5),
							createPadVoice(11),
						];
	
						bassOsc = context.createOscillator();
						bassOsc.type = 'triangle';
						const bassFilter = context.createBiquadFilter();
						bassFilter.type = 'lowpass';
						bassFilter.frequency.value = 170;
						bassGain = context.createGain();
						bassGain.gain.value = 0.0001;
						bassOsc.connect(bassFilter);
						bassFilter.connect(bassGain);
						bassGain.connect(musicBus);
						bassOsc.start();
	
						fxSend = context.createGain();
						fxSend.gain.value = 0.24;
						padBus.connect(fxSend);
	
						const delay = context.createDelay(1.4);
						delay.delayTime.value = stepSeconds * 4;
						const feedback = context.createGain();
						feedback.gain.value = 0.26;
						const delayFilter = context.createBiquadFilter();
						delayFilter.type = 'lowpass';
						delayFilter.frequency.value = 2400;
						fxSend.connect(delay);
						delay.connect(delayFilter);
						delayFilter.connect(feedback);
						feedback.connect(delay);
						delayFilter.connect(musicBus);
	
						const chorusL = context.createDelay(0.05);
						const chorusR = context.createDelay(0.05);
						chorusL.delayTime.value = 0.014;
						chorusR.delayTime.value = 0.021;
						const chorusLfo = context.createOscillator();
						chorusLfo.type = 'sine';
						chorusLfo.frequency.value = 0.22;
						const depthL = context.createGain();
						depthL.gain.value = 0.0018;
						const depthR = context.createGain();
						depthR.gain.value = -0.0014;
						chorusLfo.connect(depthL);
						chorusLfo.connect(depthR);
						depthL.connect(chorusL.delayTime);
						depthR.connect(chorusR.delayTime);
						chorusLfo.start();
						padBus.connect(chorusL);
						padBus.connect(chorusR);
	
						if (context.createStereoPanner) {
							const left = context.createStereoPanner();
							const right = context.createStereoPanner();
							left.pan.value = -0.36;
							right.pan.value = 0.36;
							chorusL.connect(left);
							chorusR.connect(right);
							left.connect(musicBus);
							right.connect(musicBus);
						} else {
							chorusL.connect(musicBus);
							chorusR.connect(musicBus);
						}
	
						const filterLfo = context.createOscillator();
						filterLfo.type = 'sine';
						filterLfo.frequency.value = 0.08;
						const filterLfoDepth = context.createGain();
						filterLfoDepth.gain.value = 75;
						filterLfo.connect(filterLfoDepth);
						filterLfoDepth.connect(padFilter.frequency);
						filterLfo.start();
	
						createNoiseBuffer();
					};
	
					const scheduleChord = (time, chord) => {
						if (!padVoices.length || !padBus || !padFilter || !bassOsc) return;
						const spread = [chord.notes[0] - 12, chord.notes[1], chord.notes[2], chord.notes[3], chord.notes[4] + 12];
	
						padVoices.forEach((voice, index) => {
							const freq = midiToFreq(spread[index % spread.length]);
							voice.oscA.frequency.setTargetAtTime(freq, time, 0.72);
							voice.oscB.frequency.setTargetAtTime(freq * 1.0012, time, 0.82);
						});
	
						bassOsc.frequency.setTargetAtTime(midiToFreq(chord.root - 12), time, 0.26);
	
						padFilter.frequency.setTargetAtTime(1460, time, 0.42);
						padFilter.frequency.setTargetAtTime(1860, time + barSeconds * 0.58, 1.12);
	
						padBus.gain.cancelScheduledValues(time);
						padBus.gain.setValueAtTime(Math.max(padBus.gain.value, 0.0001), time);
						padBus.gain.linearRampToValueAtTime(0.14, time + 0.42);
						padBus.gain.linearRampToValueAtTime(0.1, time + barSeconds * 0.92);
					};
	
					const triggerKick = (time, velocity = 1) => {
						if (!context || !drumBus) return;
						const osc = context.createOscillator();
						osc.type = 'sine';
						const tone = context.createBiquadFilter();
						tone.type = 'lowpass';
						tone.frequency.value = 260;
						const env = context.createGain();
						env.gain.setValueAtTime(0.0001, time);
						env.gain.linearRampToValueAtTime(0.118 * velocity, time + 0.006);
						env.gain.exponentialRampToValueAtTime(0.0001, time + 0.24);
						osc.frequency.setValueAtTime(142, time);
						osc.frequency.exponentialRampToValueAtTime(52, time + 0.22);
						osc.connect(tone);
						tone.connect(env);
						env.connect(drumBus);
						osc.start(time);
						osc.stop(time + 0.28);
					};
	
					const triggerSnare = (time, velocity = 1) => {
						if (!context || !drumBus || !noiseBuffer) return;
						const noise = context.createBufferSource();
						noise.buffer = noiseBuffer;
						const noiseFilter = context.createBiquadFilter();
						noiseFilter.type = 'highpass';
						noiseFilter.frequency.value = 2400;
						const noiseGain = context.createGain();
						noiseGain.gain.setValueAtTime(0.0001, time);
						noiseGain.gain.linearRampToValueAtTime(0.056 * velocity, time + 0.008);
						noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
						noise.connect(noiseFilter);
						noiseFilter.connect(noiseGain);
						noiseGain.connect(drumBus);
						noise.start(time);
						noise.stop(time + 0.15);
	
						const body = context.createOscillator();
						body.type = 'triangle';
						const bodyGain = context.createGain();
						bodyGain.gain.setValueAtTime(0.0001, time);
						bodyGain.gain.linearRampToValueAtTime(0.028 * velocity, time + 0.008);
						bodyGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.11);
						body.frequency.setValueAtTime(194, time);
						body.frequency.exponentialRampToValueAtTime(132, time + 0.11);
						body.connect(bodyGain);
						bodyGain.connect(drumBus);
						body.start(time);
						body.stop(time + 0.12);
					};
	
					const triggerClap = (time, velocity = 1) => {
						if (!context || !drumBus || !noiseBuffer) return;
						[0, 0.018, 0.034].forEach((offset, i) => {
							const noise = context.createBufferSource();
							noise.buffer = noiseBuffer;
							const filter = context.createBiquadFilter();
							filter.type = 'bandpass';
							filter.frequency.value = 1700 + i * 220;
							filter.Q.value = 0.72;
							const gain = context.createGain();
							const startAt = time + offset;
							gain.gain.setValueAtTime(0.0001, startAt);
							gain.gain.linearRampToValueAtTime((0.031 - i * 0.0052) * velocity, startAt + 0.004);
							gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.06);
							noise.connect(filter);
							filter.connect(gain);
							gain.connect(drumBus);
							noise.start(startAt);
							noise.stop(startAt + 0.07);
						});
					};
	
					const triggerHat = (time, velocity = 1) => {
						if (!context || !drumBus || !noiseBuffer) return;
						const noise = context.createBufferSource();
						noise.buffer = noiseBuffer;
						const hatFilter = context.createBiquadFilter();
						hatFilter.type = 'highpass';
						hatFilter.frequency.value = 6800;
						const hatGain = context.createGain();
						hatGain.gain.setValueAtTime(0.0001, time);
						hatGain.gain.linearRampToValueAtTime(0.026 * velocity, time + 0.003);
						hatGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.042);
						noise.connect(hatFilter);
						hatFilter.connect(hatGain);
						hatGain.connect(drumBus);
						noise.start(time);
						noise.stop(time + 0.06);
					};
	
					const scheduleDrums = (time, stepInBar) => {
						if (stepInBar % 4 === 0) triggerKick(time, stepInBar === 0 ? 1.06 : 0.92);
						if (stepInBar === 4 || stepInBar === 12) {
							triggerSnare(time, 0.9);
							triggerClap(time + 0.004, 0.78);
						}
						if (stepInBar === 2 || stepInBar === 6 || stepInBar === 10 || stepInBar === 14) triggerHat(time, 0.74);
						if (stepInBar % 2 === 1) triggerHat(time, 0.22);
					};
	
					const scheduleBass = (time, chord, stepInBar) => {
						if (!bassOsc || !bassGain) return;
						const offset = bassPattern[stepInBar];
						if (offset === null || offset === undefined) return;
						const note = chord.root - 12 + offset;
						const velocity = stepInBar % 8 === 0 ? 1.06 : 0.86;
						bassOsc.frequency.setValueAtTime(midiToFreq(note), time);
						bassGain.gain.cancelScheduledValues(time);
						bassGain.gain.setValueAtTime(0.0001, time);
						bassGain.gain.linearRampToValueAtTime(0.084 * velocity, time + 0.012);
						bassGain.gain.exponentialRampToValueAtTime(0.0001, time + stepSeconds * 1.7);
					};
	
					const triggerLead = (time, midi, velocity = 1) => {
						if (!context || !musicBus || !fxSend) return;
	
						const oscMain = context.createOscillator();
						oscMain.type = 'square';
						oscMain.frequency.setValueAtTime(midiToFreq(midi), time);
	
						const oscSub = context.createOscillator();
						oscSub.type = 'triangle';
						oscSub.frequency.setValueAtTime(midiToFreq(midi - 12), time);
	
						const tone = context.createBiquadFilter();
						tone.type = 'lowpass';
						tone.frequency.setValueAtTime(3000, time);
						tone.Q.value = 0.62;
						tone.frequency.exponentialRampToValueAtTime(1160, time + 0.34);
	
						const env = context.createGain();
						env.gain.setValueAtTime(0.0001, time);
						env.gain.linearRampToValueAtTime(0.03 * velocity, time + 0.008);
						env.gain.exponentialRampToValueAtTime(0.0001, time + 0.36);
	
						const dry = context.createGain();
						dry.gain.value = 1;
						const wet = context.createGain();
						wet.gain.value = 0.9;
	
						oscMain.connect(tone);
						oscSub.connect(tone);
						tone.connect(env);
						env.connect(dry);
						env.connect(wet);
						dry.connect(musicBus);
						wet.connect(fxSend);
	
						oscMain.start(time);
						oscSub.start(time);
						oscMain.stop(time + 0.4);
						oscSub.stop(time + 0.4);
					};
	
					const scheduleLead = (time, chord, stepInBar) => {
						const noteIndex = leadPattern[stepInBar];
						if (noteIndex === null || noteIndex === undefined) return;
						const note = chord.notes[Math.max(0, Math.min(chord.notes.length - 1, noteIndex))] + 12;
						const velocity = stepInBar % 4 === 0 ? 1.08 : 0.8;
						triggerLead(time, note, velocity);
					};
	
					const scheduler = () => {
						if (!context || !isPlaying) return;
	
						while (nextStepAt < context.currentTime + scheduleAhead) {
							const currentBar = Math.floor(stepIndex / stepsPerBar);
							const stepInBar = stepIndex % stepsPerBar;
							const chord = chordProgression[currentBar % chordProgression.length];
							if (stepInBar === 0) scheduleChord(nextStepAt, chord);
							scheduleDrums(nextStepAt, stepInBar);
							scheduleBass(nextStepAt, chord, stepInBar);
							scheduleLead(nextStepAt, chord, stepInBar);
							stepIndex += 1;
							nextStepAt += stepSeconds;
						}
	
						schedulerTimer = window.setTimeout(scheduler, 32);
					};
	
					const stopMusic = () => {
						if (!context || !master) {
							isPlaying = false;
							setToggleState(false);
							setPlayerOpen(false);
							return;
						}
	
						isPlaying = false;
						setToggleState(false);
						setPlayerOpen(false);
						if (schedulerTimer) {
							clearTimeout(schedulerTimer);
							schedulerTimer = 0;
						}
	
						applyMasterGain(0.88);
	
						window.setTimeout(() => {
							if (!context || isPlaying || context.state !== 'running') return;
							context.suspend();
						}, 940);
					};
	
					const startMusic = async () => {
						if (isPlaying) return;
						ensureAudio();
						if (!context || !master) return;
	
						if (context.state === 'suspended') await context.resume();
	
						isPlaying = true;
						setToggleState(true);
						setPlayerOpen(true);
						updatePlayerUi();
						nextStepAt = context.currentTime + 0.1;
						stepIndex = 0;
	
						applyMasterGain(1.2);
	
						if (schedulerTimer) clearTimeout(schedulerTimer);
						scheduler();
					};
	
					if (musicSlider instanceof HTMLInputElement) {
						musicSlider.addEventListener('input', () => {
							const next = Number(musicSlider.value) / 100;
							if (Number.isNaN(next)) return;
							volumeLevel = clamp(next, minVolumeLevel, maxVolumeLevel);
							if (isMuted) isMuted = false;
							updatePlayerUi();
							if (isPlaying) applyMasterGain(0.08);
						});
					}
	
					if (musicMute instanceof HTMLButtonElement) {
						musicMute.addEventListener('click', () => {
							isMuted = !isMuted;
							updatePlayerUi();
							if (isPlaying) applyMasterGain(0.18);
						});
					}
	
					musicToggle.addEventListener('click', () => {
						if (isPlaying) stopMusic();
						else startMusic();
					});
	
					document.addEventListener('visibilitychange', () => {
						if (document.hidden && isPlaying) stopMusic();
					});
	
					updatePlayerUi();
				}
			}
}
