import style from './Loader.module.scss';

export function Loader() {
  return (
    <div className={style.spinnerWrapper}>
      <div className={style.spinner} />
    </div>
  );
}
