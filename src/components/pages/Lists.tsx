import { trpc, inferQueryOutput } from "../../utils/trpc";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonLoading,
} from "@ionic/react";

type ListOutput = inferQueryOutput<"list.all">[0];

const ListEntry = (props: { list: ListOutput }) => (
  <IonItem routerLink={`/tabs/lists/${props.list.id}`} className="list-entry">
    <IonLabel>{props.list.name}</IonLabel>
  </IonItem>
);

const AllLists = () => {
  const lists = trpc.useQuery(["list.all"]);

  return (
    <>
      {!lists.data ? (
        <IonLoading isOpen={true}></IonLoading>
      ) : (
        lists.data.map((list, i) => <ListEntry list={list} key={i} />)
      )}
    </>
  );
};

const Lists = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lists</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AllLists />
      </IonContent>
    </IonPage>
  );
};

export default Lists;
