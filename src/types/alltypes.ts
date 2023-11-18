import protobuf from "protobufjs";

export interface UserDataMessage {
  name: string;
  bio: string;
  img: string;
  interests: string[]; // later on, attestations
}

export const PUserDataMessage = new protobuf.Type("UserDataMessage")
  .add(new protobuf.Field("id", 1, "string"))
  .add(new protobuf.Field("name", 2, "string"))
  .add(new protobuf.Field("bio", 3, "string"))
  .add(new protobuf.Field("img", 4, "string"))
  .add(new protobuf.Field("interests", 5, "string", "repeated"));
