import IconPageDefault from './IconPageDefault';
import IconInfo from './IconInfo';
import IconCircleCheck from './IconCircleCheck';
import IconPlus from './IconPlus';
import IconThreeDots from './IconThreeDots';
import IconPlusSmall from './IconPlusSmall';
import IconFlag from './IconFlag';
import IconPencil from './IconPencil';
import IconDuplicate from './IconDuplicate';
import IconCopy from './IconCopy';
import IconDelete from './IconDelete';

const icons = {
  IconPageDefault,
  IconInfo,
  IconCircleCheck,
  IconPlus,
  IconThreeDots,
  IconPlusSmall,
  IconFlag,
  IconPencil,
  IconDuplicate,
  IconCopy,
  IconDelete,
} as const;

export type IconName = keyof typeof icons;

const Icon = ({ name, ...props }: { name: IconName } & React.ComponentProps<'svg'>) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent {...props} /> : null;
};

export default Icon;
