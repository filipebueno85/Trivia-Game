import { Link } from 'react-router-dom';
import gearSettings from '../../assets/gear-settings.svg';
import styles from './styles.module.css';

export default function SettingsButton() {
  return (
    <Link className={ styles.settingsButton } data-testid="btn-settings" to="/settings">
      <img src={ gearSettings } alt="A gear representing settings" />
    </Link>
  );
}
