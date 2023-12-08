import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import spray.json._

case class Step(
    id: Int,
    titre: String,
    text: String,
    image: String,
    options: List[StepOption]
)

case class StepOption(
    texte: String,
    idSuiv: Int
)

object RestApi extends App with DefaultJsonProtocol {

  implicit val system = ActorSystem("rest-api")
  implicit val materializer = ActorMaterializer()
  implicit val executionContext = system.dispatcher

  implicit val stepOptionFormat = jsonFormat2(StepOption)
  implicit val stepFormat = jsonFormat5(Step)

  val jsonString = io.Source.fromResource("data.json").getLines.mkString
  val steps = jsonString.parseJson.convertTo[List[Step]]

  val route =
    path("steps") {
      get {
        complete(
          HttpEntity(ContentTypes.`application/json`, steps.toJson.toString)
        )
      }
    }

  val bindingFuture = Http().bindAndHandle(route, "0.0.0.0", 8080)

  println(s"Server online at http://0.0.0.0:8080/\nPress RETURN to stop...")
  scala.io.StdIn.readLine()

  bindingFuture
    .flatMap(_.unbind())
    .onComplete(_ => system.terminate())
}
