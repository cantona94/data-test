import { ChangeEvent, useState } from 'react';
import ReactDOM from 'react-dom/client';

interface IParam {
  id: number;
  name: string;
}

interface IParamValue {
  paramId: number;
  value: string;
}

interface IModel {
  everyday?: IParamValue[];
  business?: IParamValue[];
  homemade?: IParamValue[];
}

interface IProps {
  params: IParam[];
  model: IModel;
}

const Params: IParam[] = [
  {
    id: 1,
    name: 'Назначение',
  },
  {
    id: 2,
    name: 'Цвет',
  },
];

const ParamValue: IModel = {
  everyday: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'белый',
    },
  ],
  business: [
    {
      paramId: 1,
      value: 'деловое',
    },
    {
      paramId: 2,
      value: 'черный',
    },
  ],
  homemade: [
    {
      paramId: 1,
      value: 'домашнее',
    },
    {
      paramId: 2,
      value: 'серый',
    },
  ],
};

function ParamItemEditor(props: IProps) {
  const model = props.model as IParamValue[];
  const [state, setState] = useState<{ purpose: string; color: string }>({
    purpose: model.find((el) => el.paramId === 1)?.value as string,
    color: model.find((el) => el.paramId === 2)?.value as string,
  });

  const handleChangePurpose = (e: ChangeEvent<HTMLInputElement>) => {
    const newState = { ...state, purpose: e.target.value };
    setState(newState);
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const newState = { ...state, color: e.target.value };
    setState(newState);
  };

  return (
    <div style={{ margin: '5px' }}>
      <div style={{ marginBottom: '10px' }}>
        <span style={{ marginRight: '15px' }}>
          {props.params.find((el) => el.name === 'Назначение')?.name}
        </span>
        <input
          type="text"
          value={state.purpose}
          onChange={handleChangePurpose}
        />
      </div>
      <div>
        <span style={{ marginRight: '15px' }}>
          {props.params.find((el) => el.name === 'Цвет')?.name}
        </span>
        <input type="text" value={state.color} onChange={handleChangeColor} />
      </div>
    </div>
  );
}

function ParamsEditor({ model }: IProps) {
  const arrayModel: string[] | never = [];

  for (let i in model) {
    // получение ключей model
    arrayModel.push(i);
  }
  return (
    <>
      {arrayModel.map((modelItem) => (
        <ParamItemEditor
          key={modelItem}
          params={Params}
          model={ParamValue[modelItem as keyof IModel] as IModel}
        />
      ))}
    </>
  );
}

function Model() {
  const [stateModal, setStateModal] = useState<boolean>(false);

  const getModel = () => {
    setStateModal(true);
  };

  if (stateModal) {
    return <ParamsEditor params={Params} model={ParamValue} />;
  }

  return (
    <>
      <ParamItemEditor
        params={Params}
        model={ParamValue['everyday'] as IModel}
      />
      <div style={{ marginTop: '5px' }}>
        <button onClick={() => getModel()}>getModel</button>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Model />);
