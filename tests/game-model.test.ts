import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePackage, getBoxCapacity, ITEMS, LEVELS, ORDERS, ordersForLevel, type Order } from '../assets/scripts/GameModel.ts';

const order: Order = {
  id: 1,
  customer: '测试顾客',
  items: { bluePhone: 1, charger: 1 },
  box: 'small',
  wrap: 'bubble',
  label: 'fragile',
  seconds: 20,
  reward: 100,
};

test('perfect package succeeds', () => {
  const result = evaluatePackage(order, { bluePhone: 1, charger: 1 }, 'small', 'bubble', 'fragile', 12);
  assert.equal(result.perfect, true);
  assert.equal(result.reason, '完美打包');
  assert.equal(result.coins, 112);
});

test('wrong item fails even when count matches', () => {
  const result = evaluatePackage(order, { blackPhone: 1, charger: 1 }, 'small', 'bubble', 'fragile', 12);
  assert.equal(result.perfect, false);
  assert.equal(result.reason, '商品错误');
});

test('oversized box reduces profit without causing complaint', () => {
  const result = evaluatePackage(order, { bluePhone: 1, charger: 1 }, 'large', 'bubble', 'fragile', 12);
  assert.equal(result.perfect, true);
  assert.equal(result.coins, 82);
  assert.equal(getBoxCapacity('large'), 7);
});

test('MVP content targets are complete', () => {
  assert.equal(ITEMS.length, 20);
  assert.equal(ORDERS.length, 30);
  assert.equal(LEVELS.length, 10);
  assert.ok(LEVELS.some((level) => level.event === 'blackout'));
  assert.ok(LEVELS.some((level) => level.event === 'malfunction'));
  assert.ok(ordersForLevel(10).length >= 10);
});
