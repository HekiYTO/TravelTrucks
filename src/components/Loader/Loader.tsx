import css from './Loader.module.css';

interface Props {
  title?: string;
  text?: string;
}

export default function Loader({
  title = 'Loading tracks...',
  text = 'Please wait while we fetch the best travel trucks for you',
}: Props) {
  return (
    <div className={css.loader} role="status" aria-live="polite">
      <span className={css.spinner} aria-hidden="true" />
      <div className={css.texts}>
        <p className={css.title}>{title}</p>
        <p className={css.text}>{text}</p>
      </div>
    </div>
  );
}

// Лоадер поверх контейнера (контейнер має бути position: relative).
export function LoaderOverlay(props: Props) {
  return (
    <div className={css.overlay}>
      <Loader {...props} />
    </div>
  );
}
