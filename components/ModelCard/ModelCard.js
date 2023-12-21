import className from 'classnames/bind';
import { Container, FeaturedImage } from '../../components';
import styles from './ModelCard.module.scss';

let cx = className.bind(styles);

export default function ModelCard({ image, title, category, tags, className }) {
  const hasText = title || category || tags;

  return (
    <div className={cx(['component', className])}>
      {image && (
        <FeaturedImage
          image={image}
          className={cx('image')}
          priority
        />
      )}

      {hasText && (
        <div className={cx('text', { 'has-image': image })}>
          <Container>
            {!!title && <h2 className="text-lg font-bold">{title}</h2>}
            {!!category && <p className="text-sm text-gray-500">{category}</p>}
            {!!tags && <p className="text-sm text-gray-500">{tags.join(', ')}</p>}
          </Container>
        </div>
      )}
    </div>
  );
}
