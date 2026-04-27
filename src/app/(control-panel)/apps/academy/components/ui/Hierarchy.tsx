import { useState } from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { createPortal } from "react-dom";
import Heir from "./HeirCard"
import { useEffect } from "react";
import mockApi from "src/@mock-utils/mockApi";
import { hierarchyService } from '../../api/services/heirarchy'

type Team = {
  id: string;
  name: string;
  description: string;
  layers: number;
  levels: { name: string; rate: number }[];
};


const api = mockApi('hierarchy_teams');


export default function HierarchyTeams() {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [edit, setEdit] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);

 useEffect(() => {
  const load = async () => {
    const data = await hierarchyService.findAll();
    setTeams(data);
  };
  load();
}, []);

  const defaultLevels = (count) => {
    if (count === 1) {
      return [{ name: "Sales Representative", rate: 5 }];
    }

    if (count === 2) {
      return [
        { name: "Sales Head", rate: 2 },
        { name: "Sales Representative", rate: 5 },
      ];
    }

    if (count === 3) {
      return [
        { name: "Regional Director", rate: 1.5 },
        { name: "Sales Manager", rate: 2 },
        { name: "Sales Representative", rate: 5 },
      ];
    }

    if (count === 4) {
      return [
        { name: "VP Sales", rate: 1.5 },
        { name: "Regional Director", rate: 2 },
        { name: "Sales Manager", rate: 2.5 },
        { name: "Sales Representative", rate: 5 },
      ];
    }

    if (count === 5) {
      return [
        { name: "Chief Sales Officer", rate: 1 },
        { name: "VP Sales", rate: 1.5 },
        { name: "Regional Director", rate: 2 },
        { name: "Sales Manager", rate: 2.5 },
        { name: "Sales Representative", rate: 5 },
      ];
    }

    return [];
  };

  const [form, setForm] = useState<Omit<Team, "id">>({
  name: "",
  description: "",
  layers: 2,
  levels: defaultLevels(2),
});

  const openCreate = () => {
    setEditIndex(null);
    setForm({
      name: "",
      description: "",
      layers: 2,
      levels: defaultLevels(2),
    });
    setShowModal(true);
  };

  const openEdit = (index: number) => {
  const { id, ...rest } = teams[index];
  setForm(rest);
  setEditIndex(index);
  setShowModal(true);
  setEdit(true);
};

  const handleLayerChange = (layers) => {
    setForm({ ...form, layers, levels: defaultLevels(layers) });
  };

  const handleLevelChange = (i, field, value) => {
    const updated = [...form.levels];
    updated[i][field] = field === "rate" ? Number(value) : value;
    setForm({ ...form, levels: updated });
  };

  const isValid = () => {
    if (!form.name.trim()) return false;
    for (let lvl of form.levels) {
      if (!lvl.name.trim()) return false;
    }
    return true;
  };

const handleSubmit = async () => {
  if (editIndex !== null) {
    const team = teams[editIndex];

    const updated = await hierarchyService.update(team.id, form);

    setTeams((prev) =>
      prev.map((t, i) => (i === editIndex ? updated! : t))
    );
  } else {
    const created = await hierarchyService.create(form);

    setTeams((prev) => [...prev, created]);
  }

  setShowModal(false);
};

  const handleDelete = async (index: number) => {
  const team = teams[index];

  if (confirm("Are you sure?")) {
    await hierarchyService.delete(team.id);

    setTeams((prev) => prev.filter((_, i) => i !== index));
  }
};

  

  const totalTeams = teams.length;
  const totalLayers = teams.reduce((sum, t) => sum + t.layers, 0);
  const avgLayers = totalTeams ? (totalLayers / totalTeams).toFixed(1) : 0;
  const totalCommissionLevels = totalLayers;

  const data1={"count": totalTeams, "name":"Active hierarchies", "color":"success" }
  const data2={"count": totalLayers, "name":"Across all teams", "color":"primary" }
  const data3={"count": avgLayers, "name":"Per team", "color":"secondary" }
  const data4={"count": totalCommissionLevels, "name":"Total positions", "color":"warning"}

  

  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Heir title="Total Teams" data={data1}/>
        <Heir title="Total Layers" data={data2} />
        <Heir title="Avg Layers" data={data3}   />
        <Heir title="Commission Levels" data={data4}  />
      </div>

      <div className="flex justify-between mb-4">
        <h2 className="text-4xl font-bold mt-2">Hierarchy Teams</h2>
        <button
          onClick={openCreate}
          className="bg-green-600 text-white px-4 py-2 rounded text-xl"
        >
          + Create Team
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {teams.map((team, index) => (
          <div key={index} className="border rounded-xl p-4 shadow bg-white hover:shadow-lg">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-1">{team.name}</h3>
                <p className="text-lg text-gray-500 mb-1">
                  {team.description}
                </p>
                <div className="text-md text-gray-600 mb-3 mt-3">
              <span className="rounded-full text-blue-800 bg-blue-200 px-2 py-1.5 mr-2">{team.layers} Layers</span>      {team.layers} positions defined
            </div>
              </div>
              <div className="flex gap-2 place-items-start">
                <button onClick={() => openEdit(index)}><FuseSvgIcon className="text-slate-800">lucide:pencil</FuseSvgIcon></button>
                <button onClick={() => handleDelete(index)}><FuseSvgIcon className="text-red-800">lucide:trash-2</FuseSvgIcon></button>
              </div>
            </div>

            <div className="mt-3">
              {team.levels.map((lvl, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-gray-100 px-2 py-2.5 border rounded-lg mb-2"
                >
                  <span>
                    <div className="rounded-full bg-green-400 text-white inline px-2 py-1 mr-5">{i + 1}</div> {lvl.name}
                  </span>
                  <span className="text-green-600 font-semibold">{lvl.rate}%</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 w-110 my-3"></div>
            <span>
                Commission Range{" "}
                {team?.levels?.length
                  ? `${Math.min(...team.levels.map(l => l?.rate ?? 0))}% - ${Math.max(...team.levels.map(l => l?.rate ?? 0))}%`
                  : "N/A"}
            </span>
          </div>
        ))}
      </div>

      {showModal && createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/50  bg-opacity-40 flex items-center justify-center" onClick={()=> setShowModal(false)}>
      <div className="bg-white p-6 rounded w-[800px] max-h-[90vh] overflow-y-auto" onClick={(e)=> e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">
                {editIndex !== null ? "Edit Hierarchy Team" : "Create New Hierarchy Team"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-xl font-bold hover:cursor-pointer"
              >
                X
              </button>
            </div>
            <label className="text-lg">Team Name <span className="text-red-500">*</span></label>
            <input
              placeholder="e.g., North Region Sales Team"
              className="border w-full p-2 mb-3 rounded-lg mt-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <label className="mt-2 text-lg">Description</label>
            <input
              placeholder="Brief description of team"
              className="border w-full p-2 mb-3 mt-2 rounded-lg"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            {edit && <div className="text-sm text-gray-600 mb-3">
              <span className="rounded-full text-blue-800 bg-blue-200 p-2">{form.layers} Layers</span> • {form.layers} positions defined
            </div>}

            <div className="mb-4">
              <p className="mb-2 text-lg">Number of Hierarchy Layers <span className="text-red-500">*</span></p>
              <div className="flex gap-2 justify-evenly">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleLayerChange(num)}
                    className={`px-12 py-6 border border-3  rounded ${
                      form.layers === num ? "bg-green-200 border-green-400 text-green-700" : ""
                    }`}
                  >
                    <p className="font-semibold text-2xl">{num}</p>
                    {num ===1 && <p>Layer</p>}
                    {num > 1 && <p>Layers</p>}
                  </button>
                ))}
              </div>
              <p className="text-md mt-3 text-slate-400">Choose the number of organizational layers for your sales hierarchy</p>
            </div>
            <p className="text-lg mb-3">Configure Hierarchy Levels</p>
            <div>
              {form.levels.map((lvl, i) => (
                <div key={i} className="border p-3 rounded mb-2 bg-cyan-100/20">
                    <div className="flex gap-3">
                    <div className="rounded-full bg-green-600 h-8 w-8 text-white text-center pt-2">{i+1}</div>
                    <div className="flex ">
                  <div>
                  <p className="font-semibold mb-1">Level Name</p>
                  <input
                    className="border p-1 mr-2 border-slate-400 rounded-md"
                    value={lvl.name}
                    onChange={(e) =>
                      handleLevelChange(i, "name", e.target.value)
                    }
                  />
                  </div>
                  <div>
                  <p className="font-semibold mb-1">Commission Rate (%)</p>
                  <input
                    type="number"
                    className="border p-1 border-slate-400 rounded-md"
                    value={lvl.rate}
                    onChange={(e) =>
                      handleLevelChange(i, "rate", e.target.value)
                    }
                  />
                    </div>
                </div>
                </div>
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-md">Define each level name and its commission percentage (higher layers typically have lower rates)</p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border"
              >
                Cancel
              </button>
              <button
                disabled={!isValid()}
                onClick={handleSubmit}
                className={`px-4 py-2 text-white ${
                  isValid() ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                <FuseSvgIcon className="inline mb-1 mr-2">lucide:save</FuseSvgIcon>
                {editIndex !== null ? "Update Team" : "Create Team"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
