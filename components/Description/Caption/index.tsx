import cn from "classnames";
import styles from "./Caption.module.sass";
import Link from "next/link";

type CaptionProps = {
  title?: string;
  user?: string;
  login?: string;
};

const Caption = ({ title, user, login }: CaptionProps) => (
  <div className={styles.caption}>
    <div className={styles.line}>
      <div className={cn("h2", styles.title)}>{title}</div>
      <div className={styles.actions}>
      </div>
    </div>
    {user && (
      <div className={styles.date}>
        By
        <Link href={{
          pathname: '/profile/[slug]',
          query: { slug: login },
        }}>
          <a className={styles.byUser}>{user ? `  ${user}` : ""}</a>
        </Link>
      </div>
    )}
  </div>
);

export default Caption;
