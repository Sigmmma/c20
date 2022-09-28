import {MdSrc, RawHtml, rawHelper} from "..";
import {useCtx} from "../Ctx/Ctx";
import Md from "../Md/Md";

export type MetaboxProps = {
  metaTitle: RawHtml;
  metaClass: string;
  img: string;
  imgCaption: MdSrc;
  metaSections?: {
    body: string;
    cssClass: string;
  }[];
}

export default function Metabox(props: MetaboxProps) {
  const {metaTitle, metaClass, img, imgCaption, metaSections} = props;
  if (!img && !imgCaption && (!metaSections || metaSections.length == 0)) {
    return null;
  }

  const ctx = useCtx();

  return (
    <aside className="metabox">
      <section className={`header ${metaClass}`}>
        <p><strong {...rawHelper(metaTitle)}></strong></p>
      </section>
      {img &&
        <section className="img">
          <a href={img}><img src={img} alt=""/></a>
        </section>
      }
      {imgCaption &&
        <section className="caption">
          <p><em><Md src={imgCaption}/></em></p>
        </section>
      }
      {metaSections?.filter(it => it)?.map(({body, cssClass}) =>
        <section className={`info ${cssClass}`} {...rawHelper(body)}>
        </section>
      )}
    </aside>
  );
};

