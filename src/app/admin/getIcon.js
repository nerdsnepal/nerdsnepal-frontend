
export default function getIcon(icon,options){

    return <span className="inline-block pr-1" dangerouslySetInnerHTML={{__html:icon.toSvg(options)}}/>
}