import PageInfoCard from "../components/PageInfoCard.tsx";

export default function Home() {
  const settings = [
    {
      name: "Program List",
      description: `視聴番組の放送情報を表示`,
      link: `/programs/list`,
    },
    {
      name: "Program Setting",
      description: `視聴番組の設定`,
      link: `/programs/setting`,
    },
    {
      name: "Settings",
      description: `通知先の情報を設定`,
      link: `/settings`,
    },
  ];

  return (
    <div className="space-y-4">
      {settings.map(({ name, description, link }) => (
        <PageInfoCard name={name} description={description} link={link} />
      ))}
    </div>
  );
}
