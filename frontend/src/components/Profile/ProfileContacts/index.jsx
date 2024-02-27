import Email from './Email';
import Number from './Number';
import style from './ProfileContacts.module.css'

export default function ProfileContacts() {

  return (
    <div className={`flex justify-between gap-[65px] mb-[65px] h-[50px] ${style.contacts}`}>
      <Email />
      <Number />
    </div>
  );
}
