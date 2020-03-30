import { writable } from 'svelte/store';

import { nameToId } from '../utils';

interface Label {
  id: string;
  name: string;
  description?: string;
  colour: string;
  editing: boolean;
}

const defaultLabels = [
  {
    id: '0-bug',
    name: 'bug',
    description: "Something isn't working",
    colour: '#d73a4a',
    editing: false,
  },
  {
    id: '1-enhancement',
    name: 'enhancement',
    description: 'New feature or request',
    colour: '#a2eeef',
    editing: false,
  },
  {
    id: '2-question',
    name: 'question',
    description: 'Further information is requested',
    colour: '#d876e3',
    editing: false,
  },
];

const updateLabelIds = (labels: Label[]) =>
  labels.map((label, index) => ({
    ...label,
    id: `${nameToId(index, label.name)}`,
  }));

const { set, subscribe, update } = writable<Label[]>(defaultLabels);

export const resetLabels = () => update(() => defaultLabels);

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
    newId = `${nameToId(i, labels[i].name)}`;
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

export const loadFromRepo = (
  labels: {
    color: string;
    description: string;
    name: string;
  }[],
) => {
  update(() =>
    labels.map((label, index) => ({
      id: nameToId(index, label.name),
      name: label.name,
      description: label.description ?? undefined,
      colour: `#${label.color}`,
      editing: false,
    })),
  );
};
