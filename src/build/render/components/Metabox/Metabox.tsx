import Ctx from "../Ctx/Ctx";

const {renderMarkdownInline} = require("../markdown");

export type MetaboxProps = {
  metaTitle: string;
  metaClass: string;
  img: string;
  imgCaption: string;
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

  return (
    <aside className="metabox">
      <section className={`header ${metaClass}`}>
        <p><strong>{metaTitle}</strong></p>
      </section>
      {img &&
        <section className="img">
          <a href={img}><img src={img} alt=""/></a>
        </section>
      }
      {imgCaption &&
        <section className="caption">
          <Ctx.Consumer>
            {ctx =>
              <p><em dangerouslySetInnerHTML={{__html: renderMarkdownInline(ctx, imgCaption)}}></em></p>
            }
          </Ctx.Consumer>
        </section>
      }
      {metaSections?.filter(it => it)?.map(({body, cssClass}) =>
        <section className={`info ${cssClass}`} dangerouslySetInnerHTML={{__html: body}}>
        </section>
      )}
    </aside>
  );
};

