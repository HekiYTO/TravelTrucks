'use client';

import type { FormEvent } from 'react';
import { FiMapPin, FiX } from 'react-icons/fi';
import Button from '@/components/Button/Button';
import type { CampersFilters, FiltersResponse } from '@/lib/api/types';
import { humanize } from '@/utils/format';
import css from './FiltersSidebar.module.css';

interface Props {
  filters?: FiltersResponse;
  values: CampersFilters;
  onChange: (key: keyof CampersFilters, value: string) => void;
  onSearch: () => void;
  onClear: () => void;
}

interface GroupProps {
  title: string;
  name: keyof CampersFilters;
  options?: string[];
  value?: string;
  onChange: Props['onChange'];
}

function RadioGroup({ title, name, options, value, onChange }: GroupProps) {
  return (
    <fieldset className={css.group}>
      <legend className={css.legend}>{title}</legend>
      {options?.map((option) => (
        <label key={option} className={css.radio}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(name, option)}
          />
          <span>{humanize(option)}</span>
        </label>
      ))}
    </fieldset>
  );
}

export default function FiltersSidebar({ filters, values, onChange, onSearch, onClear }: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className={css.sidebar} onSubmit={handleSubmit} aria-label="Camper filters">
      <div className={css.field}>
        <label htmlFor="location" className={css.label}>
          Location
        </label>
        <div className={css.inputWrap}>
          <FiMapPin aria-hidden="true" />
          <input
            id="location"
            type="text"
            className={css.input}
            placeholder="City"
            value={values.location ?? ''}
            onChange={(e) => onChange('location', e.target.value)}
          />
        </div>
      </div>

      <h2 className={css.title}>Filters</h2>

      <RadioGroup title="Camper form" name="form" options={filters?.forms} value={values.form} onChange={onChange} />
      <RadioGroup title="Engine" name="engine" options={filters?.engines} value={values.engine} onChange={onChange} />
      <RadioGroup
        title="Transmission"
        name="transmission"
        options={filters?.transmissions}
        value={values.transmission}
        onChange={onChange}
      />

      <div className={css.actions}>
        <Button type="submit" fullWidth>
          Search
        </Button>
        <Button variant="outline" fullWidth onClick={onClear}>
          <FiX aria-hidden="true" />
          Clear filters
        </Button>
      </div>
    </form>
  );
}
