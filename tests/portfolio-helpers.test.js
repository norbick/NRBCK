import assert from 'node:assert/strict';
import test from 'node:test';

import {
	calculateTargetGain,
	clamp,
	getTimelineLabel,
	isValidEmail,
} from '../src/utils/portfolio-helpers.js';

test('clamp keeps values in range', () => {
	assert.equal(clamp(5, 0, 10), 5);
	assert.equal(clamp(-4, 0, 10), 0);
	assert.equal(clamp(19, 0, 10), 10);
});

test('isValidEmail accepts valid emails and rejects invalid ones', () => {
	assert.equal(isValidEmail('norbick@gmail.com'), true);
	assert.equal(isValidEmail('  hello.world+tag@sub.domain.pl  '), true);
	assert.equal(isValidEmail('invalid-email'), false);
	assert.equal(isValidEmail('no-at-sign.com'), false);
	assert.equal(isValidEmail('bad@domain'), false);
});

test('getTimelineLabel returns translated labels and falls back for unknown values', () => {
	assert.equal(getTimelineLabel('asap', true), 'Jak najszybciej');
	assert.equal(getTimelineLabel('asap', false), 'ASAP');
	assert.equal(getTimelineLabel('this-month', false), 'This month');
	assert.equal(getTimelineLabel('next-month', true), 'W przyszłym miesiącu');
	assert.equal(getTimelineLabel('custom-window', true), 'custom-window');
});

test('calculateTargetGain returns minimum when muted or stopped', () => {
	const common = {
		volumeLevel: 0.7,
		minMasterGain: 0.0001,
		maxMasterGain: 1.9,
		minVolumeLevel: 0,
		maxVolumeLevel: 1,
	};

	assert.equal(calculateTargetGain({ ...common, isPlaying: false, isMuted: false }), 0.0001);
	assert.equal(calculateTargetGain({ ...common, isPlaying: true, isMuted: true }), 0.0001);
});

test('calculateTargetGain maps volume to curve and clamps out-of-range input', () => {
	const config = {
		isPlaying: true,
		isMuted: false,
		minMasterGain: 0.0001,
		maxMasterGain: 1.9,
		minVolumeLevel: 0,
		maxVolumeLevel: 1,
	};

	const atZero = calculateTargetGain({ ...config, volumeLevel: 0 });
	const atHalf = calculateTargetGain({ ...config, volumeLevel: 0.5 });
	const atFull = calculateTargetGain({ ...config, volumeLevel: 1 });
	const belowRange = calculateTargetGain({ ...config, volumeLevel: -3 });
	const aboveRange = calculateTargetGain({ ...config, volumeLevel: 9 });

	assert.equal(atZero, 0.0001);
	assert.ok(atHalf > atZero && atHalf < atFull);
	assert.equal(atFull, 1.9);
	assert.equal(belowRange, 0.0001);
	assert.equal(aboveRange, 1.9);
});
