import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  FAIRYGUI_ORDER_ITEM_SLOTS,
  fairyGuiConveyorPool,
  fairyGuiConveyorWindow,
  fairyGuiFirstExpiredOrderIndex,
  fairyGuiOrderItems,
  fairyGuiOrderQueue,
  fairyGuiOrderRequirements,
  fairyGuiOrderTimer,
  fairyGuiSelectionNames,
  nextFairyGuiBox,
  nextFairyGuiLabel,
  nextFairyGuiWrap,
} from '../assets/scripts/FairyGuiOrderPresenter.ts';

test('FairyGUI queue exposes the first three level orders', () => {
  const queue = fairyGuiOrderQueue(1);
  assert.equal(queue.length, 3);
  assert.deepEqual(queue.map((order) => order.id), [1, 2, 3]);
});

test('order presentation keeps names, counts and published resource availability', () => {
  const [firstOrder] = fairyGuiOrderQueue(1);
  assert.deepEqual(fairyGuiOrderItems(firstOrder), [
    { id: 'bluePhone', name: '蓝色手机', count: 1, resourceName: 'item_phone_blue' },
    { id: 'charger', name: '充电器', count: 1, resourceName: 'item_charger_white' },
  ]);
  assert.deepEqual(fairyGuiOrderRequirements(firstOrder), {
    box: '小号箱',
    wrap: '无需包装',
    label: '无标签',
  });
});

test('conveyor rotates through every distinct item required by the visible queue', () => {
  const pool = fairyGuiConveyorPool(fairyGuiOrderQueue(1));
  assert.deepEqual(pool, ['bluePhone', 'charger', 'glass', 'mouse', 'battery']);
  assert.deepEqual(fairyGuiConveyorWindow(pool, 0), [
    'bluePhone', 'charger', 'glass', 'mouse',
  ]);
  assert.deepEqual(fairyGuiConveyorWindow(pool, 1), [
    'charger', 'glass', 'mouse', 'battery',
  ]);
  assert.deepEqual(fairyGuiConveyorWindow(pool, 4), [
    'battery', 'bluePhone', 'charger', 'glass',
  ]);
});

test('GamePage order board retains every runtime binding target', () => {
  const xml = readFileSync(
    new URL('../fairygui/assets/ui-game/components/OrderBoard.xml', import.meta.url),
    'utf8',
  );
  for (const slot of FAIRYGUI_ORDER_ITEM_SLOTS) {
    for (const suffix of ['', 'Bg', 'Name', 'CountBg', 'Count']) {
      assert.match(xml, new RegExp(`name="${slot}${suffix}"`));
    }
  }
  for (const name of ['requiredBoxText', 'requiredWrapText', 'requiredLabelText']) {
    assert.match(xml, new RegExp(`name="${name}"`));
  }
});

test('conveyor and box expose all runtime interaction targets', () => {
  const conveyor = readFileSync(
    new URL('../fairygui/assets/ui-game/components/ConveyorBelt.xml', import.meta.url),
    'utf8',
  );
  for (const name of ['phoneItem', 'chargerItem', 'glassItem', 'fishItem']) {
    assert.match(conveyor, new RegExp(`name="${name}"`));
  }

  const box = readFileSync(
    new URL('../fairygui/assets/ui-game/components/BoxWorkArea.xml', import.meta.url),
    'utf8',
  );
  for (const name of ['counterLabel', 'dot01', 'dot02', 'dot03', 'dot04']) {
    assert.match(box, new RegExp(`name="${name}"`));
  }

  const page = readFileSync(
    new URL('../fairygui/assets/ui-game/GamePage.xml', import.meta.url),
    'utf8',
  );
  assert.match(page, /name="shipButton"/);
});

test('all MVP orders fit the four visible order slots', () => {
  for (let levelId = 1; levelId <= 10; levelId++) {
    for (const order of fairyGuiOrderQueue(levelId, 10)) {
      assert.ok(fairyGuiOrderItems(order).length <= FAIRYGUI_ORDER_ITEM_SLOTS.length);
    }
  }
});

test('selector choices cycle through every gameplay value and wrap around', () => {
  assert.equal(nextFairyGuiBox('small'), 'medium');
  assert.equal(nextFairyGuiBox('medium'), 'large');
  assert.equal(nextFairyGuiBox('large'), 'small');

  assert.equal(nextFairyGuiWrap('none'), 'bubble');
  assert.equal(nextFairyGuiWrap('bubble'), 'ice');
  assert.equal(nextFairyGuiWrap('ice'), 'waterproof');
  assert.equal(nextFairyGuiWrap('waterproof'), 'none');

  assert.equal(nextFairyGuiLabel('none'), 'fragile');
  assert.equal(nextFairyGuiLabel('fragile'), 'cold');
  assert.equal(nextFairyGuiLabel('cold'), 'waterproof');
  assert.equal(nextFairyGuiLabel('waterproof'), 'none');
});

test('selector labels use explicit Chinese gameplay terms', () => {
  assert.deepEqual(fairyGuiSelectionNames('large', 'waterproof', 'cold'), {
    box: '大号箱',
    wrap: '防水袋',
    label: '冷藏',
  });
});

test('order timer clamps its ratio and exposes readable urgency stages', () => {
  assert.deepEqual(fairyGuiOrderTimer(30, 30), {
    ratio: 1,
    seconds: 30,
    urgency: 'normal',
  });
  assert.deepEqual(fairyGuiOrderTimer(15, 30), {
    ratio: 0.5,
    seconds: 15,
    urgency: 'warning',
  });
  const urgent = fairyGuiOrderTimer(7.2, 30);
  assert.ok(Math.abs(urgent.ratio - 0.24) < Number.EPSILON * 2);
  assert.equal(urgent.seconds, 8);
  assert.equal(urgent.urgency, 'urgent');
  assert.deepEqual(fairyGuiOrderTimer(-2, 30), {
    ratio: 0,
    seconds: 0,
    urgency: 'urgent',
  });
});

test('expired queued orders are handled one at a time in queue order', () => {
  assert.equal(fairyGuiFirstExpiredOrderIndex([3, 0, 0]), 1);
  assert.equal(fairyGuiFirstExpiredOrderIndex([3, 28, 0]), 2);
  assert.equal(fairyGuiFirstExpiredOrderIndex([3, 28, 26]), -1);
});
