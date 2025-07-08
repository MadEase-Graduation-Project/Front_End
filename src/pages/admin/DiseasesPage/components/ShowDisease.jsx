import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Save, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectDiseasesError,
  selectDiseasesLoading,
  selectSelectedDisease,
} from "@/store/selectors";
import { fetchDiseaseById } from "@/store/slices/diseaseSlice";

export default function ShowDisease({ params }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  // user selectors -------------
  const item = useSelector(selectSelectedDisease);
  const loading = useSelector(selectDiseasesLoading);
  const errorData = useSelector(selectDiseasesError);
  // ----------------------------
  useEffect(() => {
    if (id) {
      dispatch(fetchDiseaseById(id));
    }
  }, [id, dispatch]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log("Saving item:", editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Disease Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The disease you`re looking for doesn`t exist.
          </p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{item.name}</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <Button onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1  gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Disease Information</CardTitle>
              <CardDescription>
                Basic details and disease information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <p className="text-sm mt-1">{item.name}</p>
                </div>
                <div>
                  <Label htmlFor="email">Rank</Label>
                  <p className="text-sm mt-1">{item.rank ?? "non"}</p>
                </div>
                <div>
                  <Label htmlFor="phone">Description</Label>
                  <p className="text-sm mt-1">{item.description ?? "non"}</p>
                </div>
                <div>
                  <Label htmlFor="phone">DiseaseCategory</Label>
                  <p className="text-sm mt-1">
                    {item.diseaseCategoryName ?? "non"}
                  </p>
                </div>
                <div>
                  <Label>Treatment Created</Label>
                  <p className="text-sm mt-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>Last Update</Label>
                  <p className="text-sm mt-1">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
