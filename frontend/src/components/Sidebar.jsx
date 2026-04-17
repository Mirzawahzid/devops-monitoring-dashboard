function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">DevOpsHub 🚀</h2>

      <ul className="menu">
        <li className="active">Dashboard</li>
        <li>Servers</li>
        <li>Deployments</li>
        <li>Alerts</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;