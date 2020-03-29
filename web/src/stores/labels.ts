import { writable } from 'svelte/store';

import { nameToId } from '../utils';

interface Label {
  id: string;
  name: string;
  description?: string;
  colour: string;
  editing: boolean;
}

const updateLabelIds = (labels: Label[]) =>
  labels.map((label, index) => ({
    ...label,
    id: `${index}-${nameToId(label.name)}`,
  }));

const { set, subscribe, update } = writable<Label[]>([
  {
    id: 'blocked',
    name: 'blocked',
    description: 'Not ready to merge, need input from the team',
    colour: '#dd1acd',
    editing: false,
  },
  {
    id: 'bugfix',
    name: 'bugfix 🐛🔨',
    description: `Fixed something that wasn't working`,
    colour: '#f97f81',
    editing: false,
  },
  {
    id: 'dependencies',
    name: 'dependencies',
    description: 'Pull requests that update a dependency file',
    colour: '#0366d6',
    editing: false,
  },
  {
    id: 'docs',
    name: 'docs',
    description: '',
    colour: '#f2c4fc',
    editing: false,
  },
  {
    id: 'draft',
    name: 'draft',
    description: `Work in progress don't review`,
    colour: '#d4c5f9',
    editing: false,
  },
]);

export const createLabel = (label: Omit<Label, 'id' | 'editing'>) => {
  update((_labels) => {
    let labels = _labels.slice();
    labels.unshift({
      ...label,
      id: '',
      editing: false,
    });
    labels = updateLabelIds(labels);
    return labels;
  });
};

export const updateLabel = (id: string, props: Partial<Label>) => {
  let newId;
  update((_labels) => {
    const labels = _labels.slice();
    const i = labels.findIndex((l) => l.id === id);
    labels[i] = {
      ...labels[i],
      ...props,
    };
    newId = `${i}-${nameToId(labels[i].name)}`;
    labels[i].id = newId;
    return labels;
  });
  return newId;
};

export const deleteLabel = (id: string) =>
  update((_labels) => {
    const labels = _labels.filter((label) => label.id !== id);
    return updateLabelIds(labels);
  });

export const setEditLabel = (id: string, value: boolean) =>
  update((labels) =>
    labels.map((label) =>
      Object.assign(
        {},
        { ...label, editing: label.id === id ? value : label.editing },
      ),
    ),
  );

export const labels = {
  set,
  subscribe,
  update,
};
