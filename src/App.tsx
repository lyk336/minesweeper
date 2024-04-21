import { FC, useEffect, useRef, useState } from 'react';
import { Field, FieldSizes, Square } from '../scripts/field';
import './App.css';

import Board from './components/Board';

const App: FC = () => {
  const [field, setField] = useState<Array<Square>>([]);
  const [fieldSize, setFieldSize] = useState<FieldSizes>(FieldSizes.small);
  const fieldData = useRef<Field | null>(null);

  useEffect(() => {
    const field = new Field(FieldSizes.small);
    fieldData.current = field;
    setField(field.field);
  }, []);

  return (
    <main className=''>
      <Board fieldSize={fieldSize} field={field} />
    </main>
  );
};

export default App;
