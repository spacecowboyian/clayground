import { CheckboxGroupField, Checkbox } from '../Checkbox/Checkbox';
import { RadioGroup, Radio } from '../RadioGroup/RadioGroup';
import { Accordion } from '../Accordion/Accordion';
import { PriceDisplay } from '../PriceDisplay/PriceDisplay';
import { cn } from '../../utils/cn';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'radio' | 'price-range';
  options?: FilterOption[];
  priceRange?: { min: number; max: number };
}

interface FiltersProps {
  sections: FilterSection[];
  className?: string;
}

export function Filters({ sections, className }: FiltersProps) {
  return (
    <aside className={cn('flex flex-col gap-0 w-64', className)}>
      <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--bps-gray-700)] pb-2 border-b border-[var(--bps-gray-200)]">
        Refine Results
      </h2>
      <Accordion
        allowsMultipleExpanded
        items={sections.map((section) => ({
          id: section.id,
          title: section.title,
          content: (
            <div className="flex flex-col gap-2 py-1">
              {section.type === 'checkbox' && section.options && (
                <CheckboxGroupField>
                  {section.options.map((opt) => (
                    <Checkbox key={opt.id} value={opt.id}>
                      <span>{opt.label}</span>
                      {opt.count !== undefined && (
                        <span className="ml-auto text-[var(--bps-gray-400)] text-xs">({opt.count})</span>
                      )}
                    </Checkbox>
                  ))}
                </CheckboxGroupField>
              )}
              {section.type === 'radio' && section.options && (
                <RadioGroup>
                  {section.options.map((opt) => (
                    <Radio key={opt.id} value={opt.id}>
                      {opt.label}
                      {opt.count !== undefined && (
                        <span className="ml-1 text-[var(--bps-gray-400)] text-xs">({opt.count})</span>
                      )}
                    </Radio>
                  ))}
                </RadioGroup>
              )}
            </div>
          ),
        }))}
      />
    </aside>
  );
}
