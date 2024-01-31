import Email from './Email';
import Number from './Number';

export default function ProfileContacts() {

  return (
    <div className="flex justify-between gap-[65px] mb-[65px] h-[50px]">
      <Email />
      <Number />
    </div>
  );
}
