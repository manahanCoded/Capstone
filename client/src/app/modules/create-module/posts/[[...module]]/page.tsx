import Add from "../Add";
import Edit from "../Edit";

export default async function Module({ params }: { params: { module: string } }) {
  const { module } = await params; 
  const query = await module[0]

  if (query === "add"){
    return(
        <Add/>
    )
  }else if(query === "edit")
    return(
      <Edit/>
  )
  return(
    <div>
        <h1>asdasd</h1>
    </div>
  )
}
