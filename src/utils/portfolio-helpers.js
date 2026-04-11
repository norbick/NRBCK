export const TIMELINE_LABELS = Object.freeze({
	asap: Object.freeze({ pl: 'Jak najszybciej', en: 'ASAP' }),
	'this-month': Object.freeze({ pl: 'W tym miesiącu', en: 'This month' }),
	'next-month': Object.freeze({ pl: 'W przyszłym miesiącu', en: 'Next month' }),
});

export function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}

export function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
}

export function getTimelineLabel(timeline, isPolish) {
	const entry = TIMELINE_LABELS[timeline];
	if (!entry) return timeline;
	return isPolish ? entry.pl : entry.en;
}

export function calculateTargetGain({
	isPlaying,
	isMuted,
	volumeLevel,
	minMasterGain,
	maxMasterGain,
	minVolumeLevel = 0,
	maxVolumeLevel = 1,
}) {
	if (!isPlaying || isMuted) return minMasterGain;
	const level = clamp(volumeLevel, minVolumeLevel, maxVolumeLevel);
	const loudnessCurve = Math.pow(level, 0.55);
	const mappedGain = minMasterGain + (maxMasterGain - minMasterGain) * loudnessCurve;
	return Math.max(minMasterGain, mappedGain);
}
