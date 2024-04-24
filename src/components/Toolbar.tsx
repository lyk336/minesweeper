import { FC, useState, ChangeEvent } from 'react';
import { Field, FieldSizes } from '../../scripts/field';
import Stopwatch from './Stopwatch';

interface IToolbarProps {
  handleChangeFieldSize: (fieldSize: FieldSizes) => void;
  isGameStarted: boolean;
  fieldData: Field;
  mineMarks: number;
}

const Toolbar: FC<IToolbarProps> = ({ handleChangeFieldSize, isGameStarted, fieldData, mineMarks }) => {
  const [value, setValue] = useState<FieldSizes>(FieldSizes.medium);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    type FieldSizesKey = keyof typeof FieldSizes;
    const sizeKey = e.target.value as FieldSizesKey;
    const size: FieldSizes = FieldSizes[sizeKey];

    handleChangeFieldSize(size);
    setValue(size);
  };

  return (
    <nav className='toolbar'>
      <div className='toolbar__container'>
        <select className='toolbar__difficulty' name='difficulty' id='difficulty' onChange={handleChange} value={value}>
          <option value={FieldSizes.small}>small</option>
          <option value={FieldSizes.medium}>medium</option>
          <option value={FieldSizes.large}>large</option>
        </select>
        <div className='toolbar__right'>
          <Stopwatch isGameStarted={isGameStarted} fieldData={fieldData} />
          <div className='mines-left'>
            <span>{mineMarks}</span>
            <img src='src/assets/flag.webp' alt='' />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Toolbar;
